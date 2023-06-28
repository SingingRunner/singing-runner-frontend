import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  height: calc((var(--vh, 1vh) * 100) - 216px);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
