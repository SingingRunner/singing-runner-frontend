// 현재 유저에게 적용된 아이템의 효과를 보여주는 컴포넌트
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { memo } from "react";

interface IItemInfoProps {
  decibel: number;
  activeItem: {
    mute: boolean;
    frozen: boolean;
    cloud: boolean;
    keyDown: boolean;
    keyUp: boolean;
    shield: boolean;
  };
}

function ItemInfo(props: IItemInfoProps) {
  return (
    <>
      {props.activeItem.frozen && (
        <ItemInfoWrapper>
          <Msg>눈사람을 두드려서 탈출하세요!</Msg>
          <ItemInfoIcon src="/game/item/effect/frozen.png" />
        </ItemInfoWrapper>
      )}
      {props.activeItem.keyUp && (
        <ItemInfoWrapper>
          <Msg>3키 올려서 노래해주세요!</Msg>
          <ItemInfoIcon src="/game/item/effect/keyUp.png" />
        </ItemInfoWrapper>
      )}
      {props.activeItem.keyDown && (
        <ItemInfoWrapper>
          <Msg>3키 낮춰서 노래해주세요!</Msg>
          <ItemInfoIcon src="/game/item/effect/keyDown.png" />
        </ItemInfoWrapper>
      )}
      {props.activeItem.mute && (
        <ItemInfoWrapper>
          <Msg>소리를 질러서 탈출하세요!</Msg>
          <ItemInfoIcon src="/game/item/effect/mute.png" />
          <DecibelBar decibel={props.decibel + 120}>
            <div className="meter">
              <div className="bar" id="bar1"></div>
              <div className="bar" id="bar2"></div>
              <div className="bar" id="bar3"></div>
              <div className="bar" id="bar4"></div>
              <div className="bar" id="bar5"></div>
            </div>
          </DecibelBar>
        </ItemInfoWrapper>
      )}
    </>
  );
}
export default memo(ItemInfo);

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

const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s forwards, ${fadeOut} 0.5s 4s forwards;
`;

const Msg = styled.div`
  padding: 20px;
  color: #dff45b;
  font-weight: 900;
  font-size: 18px;
`;

const ItemInfoIcon = styled.img`
  width: 80px;
`;

const DecibelBar = styled.div`
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
    height: ${(props: { decibel: number }) => props.decibel}%;
    background-color: #6400ff;
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
