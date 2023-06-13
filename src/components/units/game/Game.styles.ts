import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  height: 100vh;
  border: 10px solid transparent;
  /* box-shadow: 0 0 10px 10px transparent inset; */
  animation: ${fullScreenFlash} 1s ease-in-out 3;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  font-weight: 700;
  font-size: 12px;
  color: #fe259b;
`;
export const TestButtonWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;
