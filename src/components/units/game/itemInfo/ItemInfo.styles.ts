import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
export const ITEM_DURATION = 7000; // 아이템 지속 시간

// 아이템 효과를 서서히 나타나게 하기 위한 애니메이션
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// 아이템 효과를 서서히 사라지게 하기 위한 애니메이션
const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s forwards,
    ${fadeOut} 0.5s ${ITEM_DURATION}ms forwards;
`;

export const Msg = styled.div`
  padding: 20px;
  color: #dff45b;
  font-weight: 500;
  font-size: 20px;
`;

export const ItemInfoIcon = styled.img`
  width: 80px;
`;

export const DecibelBar = styled.div`
  margin-top: 20px;

  .meter {
    display: flex;
    justify-content: space-around;
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .bar {
    width: 20px;
    height: ${(props: { decibelPercent: number }) => props.decibelPercent}%;
    max-height: 200px;
    background-color: #dff45b;
    animation: blink 1s infinite;
  }

  .bar:nth-child(2) {
    animation-delay: 0.2s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.4s;
  }

  .bar:nth-child(4) {
    animation-delay: 0.6s;
  }

  .bar:nth-child(5) {
    animation-delay: 0.8s;
  }

  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
