import * as S from "../../../../styles/emotion";
import ButtonWrapper from "../../commons/buttons/wrapper";

export interface MainUIProps {
  isClicked: boolean;
  handleClick: () => void;
  isBattleClicked: boolean;
  handleBattleClick: () => void;
  handleMatchCancel: () => void;
  timer: number;
  formatTime: (time: number) => string;
  showModal: boolean;
  setShowModal: (flag: boolean) => void;
  showLoading: boolean;
  setShowLoading: (flag: boolean) => void;
  handleLoading: () => void;
  loading: boolean;
  progress: number;
  handleBattleModeClick: () => void;
}

const MainUI = (props: MainUIProps) => {

  return (
    <>
      {!props.isBattleClicked && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1A1128",
            position: "relative",
          }}
        >
          <S.ImageWrapper>
            <S.ImageCat src="../images/cat.png" alt="Image" />
            <S.ImageMike src="../images/microphone.png" alt="Image" />
          </S.ImageWrapper>
          {props.isClicked && (
            <>
              <ButtonWrapper>
                <S.BasicButton
                  onClick={props.handleBattleClick}
                  style={{ marginBottom: "20px" }}
                >
                  배틀 모드
                </S.BasicButton>
                <S.BasicButton onClick={props.handleClick}>커스텀 모드</S.BasicButton>
              </ButtonWrapper>
            </>
          )}

          {!props.isClicked && (
            <ButtonWrapper>
              <S.StartButton onClick={props.handleClick}>START</S.StartButton>
            </ButtonWrapper>
          )}
        </div>
      )}
      {props.isBattleClicked && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1A1128",
            position: "relative",
          }}
        >
          <S.ImageWrapper>
            <S.ImageCat src="../images/cat.png" alt="Image" />
            <S.ImageMike src="../images/microphone.png" alt="Image" />
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
      {props.showModal && (
        <>
          <S.ModalBackground>
            <S.ModalWrapper>
              <S.ImageWrapper>
                <S.ImageEllipse src="../images/ellipse.png" />
                <S.ImageVector src="../images/Vector.png" />
              </S.ImageWrapper>
              <S.ModalMatchComplete>매칭이 완료되었습니다.</S.ModalMatchComplete>
              <S.ModalMatchSongArtist>YB</S.ModalMatchSongArtist>
              <S.MarqueeContainer>
                <S.MarqueeContent>
                  <S.ModalMatchSongTitle>
                    나는 나비 (A Flying Butterfly)
                  </S.ModalMatchSongTitle>
                  <S.ModalMatchSongTitle>
                    나는 나비 (A Flying Butterfly)
                  </S.ModalMatchSongTitle>
                </S.MarqueeContent>
              </S.MarqueeContainer>
              <S.MatchButtonWrapper>
                <S.MatchDenyButton>거절하기</S.MatchDenyButton>
                <S.MatchAcceptButton onClick={props.handleLoading}>
                  참여하기
                </S.MatchAcceptButton>
              </S.MatchButtonWrapper>
            </S.ModalWrapper>
          </S.ModalBackground>
        </>
      )}
      {props.showLoading && (
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
                <div
                  style={{
                    width: "300px",
                    height: "32px",
                    backgroundColor: "#1A1128",
                  }}
                >
                  <S.LoadingGauge
                    style={{
                      width: `${props.progress}%`,
                      height: "100%",
                    }}
                  />
                </div>
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
