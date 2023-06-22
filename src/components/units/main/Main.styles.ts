import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
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
export const MarqueeContainer = styled.div`
  // marquee 컨테이너
  overflow: hidden;
  white-space: nowrap;
`;
export const marqueeAnimation = keyframes` // marquee 애니메이션
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
`;
export const MarqueeContent = styled.div`
  // marquee 내용
  display: flex;
  width: max-content;
  animation: ${marqueeAnimation} 10s linear infinite;
  & > *:first-of-type {
    padding-right: 10px; // 반복 사이 간격 조정
  }
`;
export const ModalWrapper = styled.div`
  position: absolute;
  padding: 0 16px;
  height: 308px;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  position: relative;
  width: 100%;
  margin-left: 50%;
  margin: 0px 16px;
  font-size: 32px;
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
`;
export const ImageWrapper = styled.div`
  position: relative;
  top: 30%;
`;
export const ImageLogo = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 0px;
  width: 300px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;
export const ImageVectorLeft = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-1000%, -0%);
  top: 0px;
  width: 16px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;
export const ImageEllipse = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: -60px;
`;
export const ImageVector = styled.img`
  position: absolute;
  top: -58px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ImageCat = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: auto;
`;
export const ImageMic = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-85%, -15%);
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
  height: 40px;
  font-size: 16px;
  background: linear-gradient(to right, #8b50f2, #bd00fe);
  border: 1px solid #8b50f2;
  border-image: linear-gradient(to right, #8b50f2, #bd00fe) 1;
  border-image-slice: 1;
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
  width: calc(100% - 32px);
  justify-content: center;
  align-items: center;
  height: 48px;
  font-size: 16px;
  background: #bd00fe;
  border: 1px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 15px 5px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
  margin-bottom: 16px;
`;
export const MatchCancelButton = styled.button`
  width: 100%;
  justify-content: center;
  align-items: center;
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
  height: 40px;
  font-size: 16px;
  background: transparent;
  border: 2px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 3px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
  :hover {
    background: #bd00fe;
    border: 2px solid #bd00fe;
    color: white;
  }
`;
export const MainBody = styled.div`
  background-color: #1a1128;
  height: calc(100% - 108px);
  padding: 28px 16px 0px 16px;
`;
