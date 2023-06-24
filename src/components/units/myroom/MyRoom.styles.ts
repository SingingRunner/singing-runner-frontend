import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh; /* Set the desired height of the container */
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin-top: 32vh;
  margin-bottom: 48vh;
`;

export const ImageCharacter = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
  border-radius: 10%;
`;

export const ImageVectorLeft = styled.img`
  position: absolute;
  left: 4vw;
  transform: translate(-540%, 0%);
  width: 36px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;

export const ImageVectorRight = styled.img`
  position: absolute;
  right: 4vw;
  transform: translate(540%, 0%);
  width: 36px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;

export const Profile = styled.img`
  width: 46px;
  border-radius: 50%;
`;

export const Nickname = styled.div`
  margin-left: 12px;
  margin-top: 12px;
  font-size: 16px;
  color: white;
`;

export const Setting = styled.img`
  position: absolute;
  height: 40px;
  width: auto;
  top: 8px;
  right: 8px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProfileWrapper = styled.div`
  display: flex;
`;

export const TierWrapper = styled.div`
  display: flex;
  margin-top: -8px;
  flex-direction: column;
  align-items: flex-end;
`;

export const Mmr = styled.div`
  height: 14px;
  margin-right: 12px;
  font-size: 12px;
  text-shadow: -1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128;
  color: #dff45b;
`;
export const Tier = styled.div`
  display: flex;
  align-items: center;
`;
export const LetterTier = styled.div`
  margin-right: 8px;
  font-size: 24px;
  color: #dcdcdc;
  font-family: Pretendard-bold;
`;

export const IconTier = styled.img`
  width: 16px;
`;
