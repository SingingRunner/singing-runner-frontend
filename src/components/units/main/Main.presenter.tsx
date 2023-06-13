import * as S from "./Main.styles";
import ButtonWrapper from "../../commons/buttons/wrapper";
import { IMainUIProps } from "./Main.types";

const MainUI = (props: IMainUIProps) => {
  return (
    <>
      {!props.isBattleClicked && ( // 1. 배틀 모드 클릭 전
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1A1128",
            position: "relative",
          }}
        >
          <S.ImageWrapper>
            <S.ImageCat src="../images/cat.png" alt="Cat" />
            <S.ImageMic src="../images/microphone.png" alt="Microphone" />
          </S.ImageWrapper>
          {props.isClicked && ( // 1-2. START 클릭 후 모드 선택 화면
            <>
              <ButtonWrapper>
                <S.BasicButton
                  onClick={props.handleBattleModeClick}
                  style={{ marginBottom: "20px" }}
                >
                  배틀 모드
                </S.BasicButton>
                <S.BasicButton onClick={props.handleClick}>
                  커스텀 모드
                </S.BasicButton>
              </ButtonWrapper>
            </>
          )}

          {!props.isClicked && ( // 1-1. 처음 화면
            <ButtonWrapper>
              <S.StartButton onClick={props.handleClick}>START</S.StartButton>
            </ButtonWrapper>
          )}
        </div>
      )}
      {props.isBattleClicked && ( // 2. 배틀 모드 버튼 클릭 후
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1A1128",
            position: "relative",
          }}
        >
          <S.ImageWrapper>
            <S.ImageCat src="../images/cat.png" alt="Cat" />
            <S.ImageMic src="../images/microphone.png" alt="Microphone" />
          </S.ImageWrapper>
          <ButtonWrapper>
            <S.MatchButton
              onClick={props.handleBattleModeClick}
              style={{ marginBottom: "20px" }}
            >
              <S.Timer>{props.formatTime(props.timer)}</S.Timer>
              게임 찾는 중...
            </S.MatchButton>
            <S.MatchCancelButton onClick={props.handleMatchCancel}>
              매칭 취소
            </S.MatchCancelButton>
          </ButtonWrapper>
        </div>
      )}
      {props.showModal && ( // 매칭 잡혔을 때 모달
        <>
          <S.ModalBackground>
            <S.ModalWrapper>
              <S.ImageWrapper>
                <S.ImageEllipse src="/images/Ellipse.png" />
                <S.ImageVector src="/images/Vector.png" />
              </S.ImageWrapper>
              <S.ModalMatchComplete>
                매칭이 완료되었습니다.
              </S.ModalMatchComplete>
              <S.ModalMatchSongArtist>
                {props.singer ? props.singer : "강산에"}
              </S.ModalMatchSongArtist>
              <S.MarqueeContainer>
                <S.MarqueeContent>
                  <S.ModalMatchSongTitle>
                    {props.songTitle
                      ? props.songTitle
                      : "거꾸로 강을 거슬러 오르는 저 힘찬 연어들처럼"}
                  </S.ModalMatchSongTitle>
                  <S.ModalMatchSongTitle>
                    {props.songTitle
                      ? props.songTitle
                      : "거꾸로 강을 거슬러 오르는 저 힘찬 연어들처럼"}
                  </S.ModalMatchSongTitle>
                </S.MarqueeContent>
              </S.MarqueeContainer>
              <S.MatchButtonWrapper>
                <S.MatchDenyButton onClick={props.handleMatchDecline}>
                  거절하기
                </S.MatchDenyButton>
                <S.MatchAcceptButton onClick={props.handleMatchAccept}>
                  참여하기
                </S.MatchAcceptButton>
              </S.MatchButtonWrapper>
            </S.ModalWrapper>
          </S.ModalBackground>
        </>
      )}
      {props.showWaiting && ( // 대기 화면
        <>
          <S.ModalBackground>
            <S.ModalWrapper>
              <S.ImageWrapper>
                <S.ImageEllipse src="/images/Ellipse.png" />
                <S.ImageVector src="/images/Vector.png" />
              </S.ImageWrapper>
              <S.ModalMatchComplete>
                다른 유저를 기다리는 중입니다.
              </S.ModalMatchComplete>
              <S.ModalMatchSongArtist>
                {props.singer ? props.singer : "TEST"}
              </S.ModalMatchSongArtist>
              <S.MarqueeContainer>
                <S.MarqueeContent>
                  <S.ModalMatchSongTitle>
                    {props.songTitle ? props.songTitle : "TEST"}
                  </S.ModalMatchSongTitle>
                  <S.ModalMatchSongTitle>
                    {props.songTitle ? props.songTitle : "TEST"}
                  </S.ModalMatchSongTitle>
                </S.MarqueeContent>
              </S.MarqueeContainer>
              <button onClick={props.handleLoadingClick}>test</button>
            </S.ModalWrapper>
          </S.ModalBackground>
        </>
      )}
      {props.showLoading && ( // 로딩 화면
        <>
          <S.LoadingBackground>
            {props.loading ? (
              <S.LoadingMessage>잠시만 기다려주세요.</S.LoadingMessage>
            ) : (
              <></>
            )}
            {props.loading ? (
              <S.LoadingBarWrapper>
                Loading...
                <S.LoadingBar>
                  <S.LoadingGauge
                    style={{
                      width: `${props.progress}%`,
                    }}
                  />
                </S.LoadingBar>
              </S.LoadingBarWrapper>
            ) : (
              <S.LoadingMessage>게임이 시작됩니다!</S.LoadingMessage>
            )}
            <S.MatchButtonWrapper></S.MatchButtonWrapper>
          </S.LoadingBackground>
        </>
      )}
    </>
  );
};

export default MainUI;
