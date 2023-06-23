import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 16px 0 0;
  height: 52px;
  color: white;
  img {
    height: 40px;
  }
  span {
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
`;
