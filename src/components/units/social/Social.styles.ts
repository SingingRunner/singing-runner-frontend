import styled from "@emotion/styled";

export const Add = styled.img`
  position: absolute;
  height: 45px;
  width: auto;
  top: 8px;
  right: 48px;
`;

export const Setting = styled.img`
  position: absolute;
  height: 45px;
  width: auto;
  top: 10px;
  right: 8px;
`;

export const Container = styled.div`
  height: 100vh;
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
  top: 54px;
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
  top: 60px;
`;

export const Mmr = styled.div`
  color: white;
  font-size: 10px;
  margin-left: 4px;
`;

export const Label = styled.div`
  color: white;
  margintop: 16px;
`;
