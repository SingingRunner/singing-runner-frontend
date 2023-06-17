import * as S from "./Modal.styles";

interface IModalProps {
  /* 아이콘 */
  isCheck?: boolean; // 체크 표시 아이콘인 경우 true
  /* 텍스트 */
  hilightText?: string; // 강조 표시해야하는 닉네임
  firstText?: string;
  secondText?: string; // 알림이 두 줄인 경우 두번째 텍스트
  /* 버튼 */
  buttonText: string; // 버튼이 두개인 경우, 오른쪽 버튼의 텍스트
  leftButtonText?: string; // 버튼이 두개인 경우, 왼쪽 버튼의 텍스트
  /* 노래 정보 */
  songTitle?: string;
  singer?: string;
}

export default function Modal(props: IModalProps) {
  return (
    <>
      <S.Background>
        <S.Wrapper isLargeSize={!!props.singer}>
          <img src={props.isCheck ? "/icon/check.png" : "/icon/warning.png"} />
          {props.singer ? (
            // 배틀 모드 매칭 완료 모달인 경우
            <S.Text>
              <p>매칭이 완료되었습니다.</p>
              <S.SongWrapper>
                <p>{props.singer}</p>
                {props.songTitle && props.songTitle?.length >= 10 ? (
                  <S.FlowSongTitleWrapper>
                    <S.FlowSongTitle>
                      <S.SongTitle>{props.songTitle}</S.SongTitle>
                      <S.SongTitle>{props.songTitle}</S.SongTitle>
                    </S.FlowSongTitle>
                  </S.FlowSongTitleWrapper>
                ) : (
                  <S.SongTitle>{props.songTitle}</S.SongTitle>
                )}
              </S.SongWrapper>
            </S.Text>
          ) : // 매칭 완료 모달 버튼 이외의 모든 경우
          !props.secondText ? (
            // 텍스트가 한 줄인 경우
            <S.Text>
              <p>{props.firstText}</p>
            </S.Text>
          ) : (
            // 텍스트가 두 줄인 경우
            <S.Text>
              <p>
                <span>{props.hilightText}</span>
                {props.firstText}
              </p>
              <p>{props.secondText}</p>
            </S.Text>
          )}
          {!props.leftButtonText ? (
            // 버튼이 한 개인 경우
            <S.ButtonWrapper>
              <S.SingleButton>{props.buttonText}</S.SingleButton>
            </S.ButtonWrapper>
          ) : (
            // 버튼이 두 개인 경우
            <S.ButtonWrapper>
              <S.DoubleButton isLeft>{props.leftButtonText}</S.DoubleButton>
              <S.DoubleButton>{props.buttonText}</S.DoubleButton>
            </S.ButtonWrapper>
          )}
        </S.Wrapper>
      </S.Background>
    </>
  );
}