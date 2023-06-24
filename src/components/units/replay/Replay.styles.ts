import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Set the desired height of the container */
`;

export const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const Singer = styled.div`
  color: #dff45b;
  font-size: 12px;
  font-weight: 700;
`;

export const SongTitle = styled.div`
  width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const ReplayInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Date = styled.div`
  color: #fff;
  font-size: 10px;
  font-weight: 200;
`;
