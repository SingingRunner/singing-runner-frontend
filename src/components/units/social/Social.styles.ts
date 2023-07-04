import styled from "@emotion/styled";

export const Add = styled.img`
  position: absolute;
  height: 40px;
  width: auto;
  top: 8px;
  right: 44px;
`;

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

export const SearchIcon = styled.img`
  position: absolute;
  width: 20px;
  top: 10px;
  left: 12px;
`;

export const InfiniteScrollWrapper = styled.div`
  position: absolute;
  top: 74px;
  height: calc(100% - 200px);
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
  top: 80px;
`;

export const Mmr = styled.div`
  color: white;
  font-size: 10px;
  margin-left: 4px;
`;

export const Label = styled.div`
  color: white;
  margin-top: 16px;
`;
