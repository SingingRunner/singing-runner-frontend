import styled from "@emotion/styled";

export const Setting = styled.img`
  position: absolute;
  height: 40px;
  width: auto;
  top: 8px;
  right: 8px;
`;

export const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InfiniteScrollWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: auto;

  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */

  /* For Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const InputWrapper = styled.div`
  position: fixed;
  width: calc(100% - 32px);
  top: 60px;
`;

export const Mmr = styled.div`
  color: white;
  font-size: 10px;
  margin-left: 4px;
`;
