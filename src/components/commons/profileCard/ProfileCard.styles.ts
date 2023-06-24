import styled from "@emotion/styled";
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const ImgWrapper = styled.div`
  position: relative;
  width: 30px;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
export const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;
export const AddIcon = styled.img`
  position: absolute;
  right: -4px;
  bottom: 0;
  width: 16px;
`;
export const OnlineIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #03ff49;
`;
export const OfflineIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #c7c7c7;
`;
export const NicknameWrapper = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-right: 4px;
`;
export const Nickname = styled.span`
  color: ${(props: { isMatched?: boolean }) =>
    props.isMatched ? "#fe259b" : "#fff"};
  font-size: 16px;
  font-weight: 500;
`;
export const Tier = styled.img`
  width: 16px;
  height: 16px;
`;
