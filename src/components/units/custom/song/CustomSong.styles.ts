import styled from "@emotion/styled";

export const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Singer = styled.div`
  display: flex;
`;

export const SingerWord = styled.div`
  color: ${(props: { isMatched?: boolean; marginRight?: boolean }) =>
    props.isMatched ? "#fe259b" : "#dff45b"};
  font-size: 12px;
  font-weight: 700;
  margin-right: ${(props: { isMatched?: boolean; marginRight?: boolean }) =>
    props.marginRight ? "3px" : "0"};
`;

export const SongTitle = styled.div`
  display: flex;
  width: 100%;
`;
export const SongTitleWord = styled.div`
  color: ${(props: { isMatched?: boolean; marginRight?: boolean }) =>
    props.isMatched ? "#fe259b" : "#ffffff"};
  font-size: 16px;
  font-weight: 500;
  margin-right: ${(props: { isMatched?: boolean; marginRight?: boolean }) =>
    props.marginRight ? "4px" : "0"};
`;

export const HilightSongTitle = styled.div`
  width: 100%;
  color: #fe259b;
  font-size: 16px;
  font-weight: 500;
`;
