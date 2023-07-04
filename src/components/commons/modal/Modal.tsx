import { useEffect, useState } from "react";
import * as S from "./Modal.styles";
import { useRouter } from "next/router";

export interface IModalProps {
  /* 아이콘 */
  isCheck?: boolean; // 체크 표시 아이콘인 경우 true
  /* 텍스트 */
  hilightText?: string; // 강조 표시해야하는 닉네임
  firstText?: string; // 모달 알림 내용
  secondText?: string; // 알림이 두 줄인 경우 두번째 텍스트
  /* 버튼 */
  buttonText?: string; // 버튼이 두개인 경우, 오른쪽 버튼의 텍스트
  leftButtonText?: string; // 버튼이 두개인 경우, 왼쪽 버튼의 텍스트
  /* 노래 정보 */
  songTitle?: string;
  singer?: string;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

const NO_MODAL_PAGES = ["/game"];
export default function Modal(props: IModalProps) {
  const router = useRouter();

  if (NO_MODAL_PAGES.includes(router.asPath)) return <></>;

  // 소리 재생 함수
  const playSound = () => {
    const audio = new Audio("/sound/effect/disabled_button.mp3");
    audio.play();
  };

  // 오른쪽 버튼 클릭 시 실행되는 함수
  const handleRightClick = () => {
    playSound(); // 소리 재생
    props.onClickRight?.(); // 원래의 onClickRight 함수 실행 (optional chaining 사용)
  };

  // 왼쪽 버튼 클릭 시 실행되는 함수
  const handleLeftClick = () => {
    playSound(); // 소리 재생
    props.onClickLeft?.(); // 원래의 onClickLeft 함수 실행 (optional chaining 사용)
  };

  // 매칭 완료 모달의 카운트
  const [count, setCount] = useState(9);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) handleLeftClick();

        return prevCount > 0 ? prevCount - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <S.Background>
        <S.Wrapper isLargeSize={!!props.singer}>
          {props.singer && !props.isCheck ? (
            <S.Count>{count}</S.Count>
          ) : (
            <img
              src={props.isCheck ? "/icon/check.png" : "/icon/warning.png"}
            />
          )}
          {props.singer ? (
            // 랭크 모드 매칭 완료 모달인 경우
            <S.Text>
              <p>{props.firstText ?? `매칭이 완료되었습니다.`}</p>
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
                {props.hilightText && <span>{props.hilightText}</span>}
                {props.firstText}
              </p>
              <p>{props.secondText}</p>
            </S.Text>
          )}
          {props.buttonText &&
            (!props.leftButtonText ? (
              // 버튼이 한 개인 경우
              <S.ButtonWrapper>
                <S.SingleButton onClick={handleRightClick}>
                  {props.buttonText}
                </S.SingleButton>
              </S.ButtonWrapper>
            ) : (
              // 버튼이 두 개인 경우
              <S.ButtonWrapper>
                <S.DoubleButton onClick={handleLeftClick} isLeft>
                  {props.leftButtonText}
                </S.DoubleButton>
                <S.DoubleButton onClick={handleRightClick}>
                  {props.buttonText}
                </S.DoubleButton>
              </S.ButtonWrapper>
            ))}
        </S.Wrapper>
      </S.Background>
    </>
  );
}
