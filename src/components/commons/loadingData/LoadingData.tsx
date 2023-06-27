import styled from "@emotion/styled";

export default function LoadingData() {
  return <Wrapper>잠시만 기다려주세요</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
`;
