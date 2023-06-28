import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 200px;
`;

export const ImageCharacter = styled.img`
  width: 200px;
  height: auto;
  border-radius: 10%;
`;

export const ImageVectorLeft = styled.img`
  width: 36px;
  height: auto;
`;

export const ImageVectorRight = styled.img`
  width: 36px;
  height: auto;
  rotate: 180deg;
`;
