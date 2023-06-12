import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const LoadingMessage = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 95px;
  background: #1A1128;
  color: #bd00fe;
`;

export const LoadingBarWrapper = styled.div`
  position: fixed;
  margin: 470px 35px;
  color: #ffffff;
`;

export const LoadingBar = styled.div`
  width: 300px,
  height: 30px,
  backgroundColor: #ffffff,
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
`;

export const LoadingGauge = styled.div`
  background: linear-gradient(to right, #8b50f2, #bd00fe);
`;

export const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  /* background: rgba(255, 255, 255, 1); */
  background: #1A1128;
  z-index: 2;
`;

export const MatchAcceptButton = styled.button`
  position: relative;
  width: 50%;
  height: 40px;
  color: #ffffff;
  font-size: 16px;
  background: #bd00fe;
  border: #bd00fe;
  border-radius: 0px 0px 4px 0px;
`;

export const MatchDenyButton = styled.button`
  position: relative;
  width: 50%;
  height: 40px;
  color: #ffffff;
  font-size: 16px;
  background: #c7c7c7;
  border: #c7c7c7;
  border-radius: 0px 0px 0px 4px;
`;

export const MatchButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const marqueeAnimation = keyframes` // marquee 애니메이션
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export const MarqueeContainer = styled.div`
  // marquee 컨테이너
  overflow: hidden;
  white-space: nowrap;
`;

export const MarqueeContent = styled.div`
  // marquee 내용
  display: flex;
  width: max-content;
  animation: ${marqueeAnimation} 10s linear infinite;
  & > *:first-child {
    padding-right: 10px; // 반복 사이 간격 조정
  }
`;

export const ModalWrapper = styled.div`
  position: absolute;
  padding: 0 16px;
  top: 24%;
  left: 5%;
  width: 80%;
  height: 308px;
  background: #ffffff;
  border-radius: 4px;
`;

export const ModalMatchComplete = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 95px;
  background: #ffffff;
`;

export const ModalMatchSongArtist = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: 36px;
  color: #bd00fe;
`;

export const ModalMatchSongTitle = styled.div`
  font-size: 32px;
  text-align: center;
  margin: 0px 16px;
  font-weight: bold;
  color: #bd00fe;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: 2;
`;

export const ImageWrapper = styled.div`
  position: relative;
  top: 35%;
`;

export const ImageEllipse = styled.img`
  position: absolute;
  left: 45%;
  top: -60px;
  z-index: 1;
`;

export const ImageVector = styled.img`
  position: absolute;
  left: 47.5%;
  top: -48px;
  z-index: 1;
`;

export const ImageCat = styled.img`
  position: absolute;
  left: 32%;
  z-index: 1;
`;

export const ImageMike = styled.img`
  position: absolute;
  top: 62px;
  left: 24%;
  z-index: 2;
`;

export const Timer = styled.div`
  font-size: 10px;
`;


export const StartButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 40px;
  font-size: 16px;
  background: linear-gradient(to right, #8b50f2, #bd00fe);
  border: 1px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 1.5px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
  :hover {
    background: #bd00fe;
    border: 1px solid #bd00fe;
    color: white;
  }
`;

export const MatchButton = styled.button`
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 48px;
  font-size: 16px;
  background: #bd00fe;
  border: 1px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 15px 5px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
`;

export const MatchCancelButton = styled.button`
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 40px;
  font-size: 16px;
  background: transparent;
  border: 2px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 15px 5px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
`;

export const BasicButton = styled.button`
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 40px;
  font-size: 16px;
  background: transparent;
  border: 1px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 1.5px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
  :hover {
    background: #bd00fe;
    border: 1px solid #bd00fe;
    color: white;
  }
`;

/* box-shadow: rgba(100, 0, 255, 0.15); */
// img {
//   content: url("/lecture/download-hover.png");
// }
/* display: flex; */
/* flex-direction: row; */
/* font-family: "SUIT500"; */
// img {
//   content: url("/lecture/download.png");
//   margin-right: 5px;
// }
