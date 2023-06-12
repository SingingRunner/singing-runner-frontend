import React, { useState } from "react";
import io from "socket.io-client";
import {
  BasicButton,
  ImageCat,
  ImageMike,
  ImageWrapper,
  MatchButton,
  MatchCancelButton,
  ModalWrapper,
  StartButton,
  Timer,
  ImageEllipse,
  ImageVector,
  ModalBackground,
  ModalMatchComplete,
  ModalMatchSongTitle,
  ModalMatchSongArtist,
  MarqueeContainer,
  MarqueeContent,
  MatchButtonWrapper,
  MatchAcceptButton,
  MatchDenyButton,
  LoadingBar,
  LoadingBackground,
  LoadingBarWrapper,
  LoadingGauge,
  LoadingMessage,
} from "../../../../styles/emotion";
import ButtonWrapper from "../../commons/buttons/wrapper";

interface MainUIProps {
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
}

const MainUI: React.FC<MainUIProps> = ({
  handleClick,
  isClicked,
  isBattleClicked,
  handleBattleClick,
  handleMatchCancel,
  timer,
  formatTime,
  showModal,
  setShowModal,
  showLoading,
  setShowLoading,
  handleLoading,
  loading,
  progress,
}) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const handleBattleModeClick = () => {
    if (socket === null) {
      // Open socket and start socket communication
      const newSocket = io("https://injungle.shop");
      setSocket(newSocket);

      // Add event listeners or perform any necessary socket communication logic
      newSocket.on("connect", () => {
        console.log("Socket connected");
        // You can send/receive messages, emit events, etc.
      });

      // Place your socket-related code here

      // You can also update any state or perform other actions related to the battle mode
    }
  };

  return (
    <>
      {!isBattleClicked && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1A1128",
            position: "relative",
          }}
        >
          <ImageWrapper>
            <ImageCat src="../images/cat.png" alt="Image" />
            <ImageMike src="../images/microphone.png" alt="Image" />
          </ImageWrapper>
          {isClicked && (
            <>
              <ButtonWrapper>
                <BasicButton
                  onClick={handleBattleClick}
                  style={{ marginBottom: "20px" }}
                >
                  배틀 모드
                </BasicButton>
                <BasicButton onClick={handleClick}>커스텀 모드</BasicButton>
              </ButtonWrapper>
            </>
          )}

          {!isClicked && (
            <ButtonWrapper>
              <StartButton onClick={handleClick}>START</StartButton>
            </ButtonWrapper>
          )}
        </div>
      )}
      {isBattleClicked && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1A1128",
            position: "relative",
          }}
        >
          <ImageWrapper>
            <ImageCat src="../images/cat.png" alt="Image" />
            <ImageMike src="../images/microphone.png" alt="Image" />
          </ImageWrapper>
          <ButtonWrapper>
            <MatchButton
              onClick={handleBattleModeClick}
              style={{ marginBottom: "20px" }}
            >
              <Timer>{formatTime(timer)}</Timer>
              게임 찾는 중...
            </MatchButton>
            <MatchCancelButton onClick={handleMatchCancel}>
              매칭 취소
            </MatchCancelButton>
          </ButtonWrapper>
        </div>
      )}
      {showModal && (
        <>
          <ModalBackground>
            <ModalWrapper>
              <ImageWrapper>
                <ImageEllipse src="../images/ellipse.png" />
                <ImageVector src="../images/Vector.png" />
              </ImageWrapper>
              <ModalMatchComplete>매칭이 완료되었습니다.</ModalMatchComplete>
              <ModalMatchSongArtist>YB</ModalMatchSongArtist>
              <MarqueeContainer>
                <MarqueeContent>
                  <ModalMatchSongTitle>
                    나는 나비 (A Flying Butterfly)
                  </ModalMatchSongTitle>
                  <ModalMatchSongTitle>
                    나는 나비 (A Flying Butterfly)
                  </ModalMatchSongTitle>
                </MarqueeContent>
              </MarqueeContainer>
              <MatchButtonWrapper>
                <MatchDenyButton>거절하기</MatchDenyButton>
                <MatchAcceptButton onClick={handleLoading}>
                  참여하기
                </MatchAcceptButton>
              </MatchButtonWrapper>
            </ModalWrapper>
          </ModalBackground>
        </>
      )}
      {showLoading && (
        <>
          <LoadingBackground>
            {loading ? (
              <LoadingMessage>잠시만 기다려주세요.</LoadingMessage>
            ) : (
              <></>
            )}
            {loading ? (
              <LoadingBarWrapper>
                Loading...
                <div
                  style={{
                    width: "300px",
                    height: "32px",
                    backgroundColor: "#1A1128",
                  }}
                >
                  <LoadingGauge
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                    }}
                  />
                </div>
              </LoadingBarWrapper>
            ) : (
              <LoadingMessage>게임이 시작됩니다!</LoadingMessage>
            )}
            <MatchButtonWrapper></MatchButtonWrapper>
          </LoadingBackground>
        </>
      )}
    </>
  );
};

export default MainUI;
