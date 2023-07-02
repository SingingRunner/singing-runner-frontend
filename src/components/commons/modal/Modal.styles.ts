import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Background = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props: { isLargeSize?: boolean }) =>
    props.isLargeSize ? "336px" : "288px"};
  background: #fcfcfc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0 0;
  img {
    width: 48px;
    height: 48px;
  }
`;

export const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #8b50f2 0%, #bd00fe 100%);
  width: 48px;
  height: 48px;
  font-size: 28px;
  color: #fff;
  font-weight: 700;
  border-radius: 50%;
`;

export const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 56px;
  margin: 20px 0 20px;
  p:nth-of-type(1) {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #bd00fe;
  }
  p:nth-of-type(2) {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #bd00fe;
  }
`;
export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 96px);
  p,
  span {
    font-weight: 500;
    font-size: 18px;
    height: 30px;
  }
  span {
    font-weight: 900;
    color: #fe259b;
  }
`;
export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 48px;
  display: flex;
`;
export const SingleButton = styled.div`
  background: #bd00fe;
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
`;
export const DoubleButton = styled.div`
  width: 50%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  border-radius: ${(props: { isLeft?: boolean }) =>
    props.isLeft ? "0px 0px 0px 4px" : "0px 0px 4px 0px"};
  background-color: ${(props: { isLeft?: boolean }) =>
    props.isLeft ? "#C7C7C7" : "#bd00fe"};
`;
export const FlowSongTitleWrapper = styled.div`
  overflow-x: hidden;
  width: 254px;
`;
export const flowAnimation = keyframes` // marquee 애니메이션
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
`;
export const FlowSongTitle = styled.div`
  display: flex;
  width: max-content;
  animation: ${flowAnimation} 5s linear infinite;
  & > *:first-of-type {
    padding-right: 40px; // 반복 사이 간격 조정
  }
`;
export const SongTitle = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: #bd00fe;
`;
