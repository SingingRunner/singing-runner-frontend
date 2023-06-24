import styled from "@emotion/styled";

export default function NoData() {
  return <Wrapper>검색 결과가 없습니다</Wrapper>;
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
