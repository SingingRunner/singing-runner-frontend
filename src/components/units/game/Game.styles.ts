import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`;
const fullScreenFlash = keyframes`
    0% { border-color: transparent; }
    50% { border-color: #dff45b; }
    100% { border-color: transparent; }
    /* 0% { box-shadow: 0 0 10px 10px transparent inset; }
  50% { box-shadow: 0 0 10px 10px #dff45b  inset; }
  100% { box-shadow: 0 0 10px 10px transparent inset; } */
  `;
export const ItemEffectWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  border: 10px solid transparent;
  /* box-shadow: 0 0 10px 10px transparent inset; */
  animation: ${fullScreenFlash} 1s infinite;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  font-weight: 900;
  font-size: 14px;
  color: #fe259b;
`;
export const TestButtonWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;
export const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  /* background: rgba(255, 255, 255, 1); */
  background: #1a1128;
`;
export const LoadingMessage = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 95px;
  background: #1a1128;
  color: #bd00fe;
`;
export const LoadingBarWrapper = styled.div`
  position: relative;
  top: 70%;
  width: 90%;
  margin: 0 16px;
  color: #ffffff;
`;
export const LoadingBar = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
  background-color: #ffffff;
`;
export const LoadingGauge = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #8b50f2, #bd00fe);
`;
export const MatchButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
