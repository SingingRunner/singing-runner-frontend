import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin-top: 32vh;
  margin-bottom: 48vh;
`;

export const ImageCharacter = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: auto;
`;

export const Option = styled.div`
  height: 28px;
  color: white;
`;

export const Logout = styled.div`
  position: fixed;
  bottom: 56px;
  width: calc(100% - 32px);
  height: 44px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
`;
