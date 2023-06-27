import styled from "@emotion/styled";

interface ITierProps {
  tier: string;
}

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 250px;
`;

export const ImageCharacter = styled.img`
  width: 200px;
  height: auto;
  border-radius: 10%;
`;

export const ImageVectorLeft = styled.img`
  width: 36px;
  height: auto;
`;

export const ImageVectorRight = styled.img`
  width: 36px;
  rotate: 180deg;
  height: auto;
`;

export const Profile = styled.img`
  width: 46px;
  border-radius: 50%;
`;

export const PlaceholderProfile = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #1a1128;
`;

export const Nickname = styled.div`
  margin-left: 12px;
  margin-top: 14px;
  font-size: 16px;
  color: white;
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
  img {
    height: 40px;
    width: 40px;
    margin: 0 -4px;
  }
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
  align-items: center;
  justify-content: space-between;
`;

export const ProfileWrapper = styled.div`
  display: flex;
`;

export const TierWrapper = styled.div`
  position: relative;
`;

export const Mmr = styled.div`
  position: absolute;
  right: 0;
  top: -12px;
  height: 14px;
  font-size: 12px;
  font-weight: 300;
  text-shadow: -1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128;
  color: #dff45b;
`;

export const PlaceholderMmr = styled.div`
  height: 14px;
  margin-right: 12px;
  font-size: 12px;
  text-shadow: -1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128;
  color: transparent;
`;

export const Tier = styled.div`
  display: flex;
  align-items: center;
`;

export const PlaceholderIconTier = styled.div`
  width: 16px;
  height: 16px;
  background-color: #1a1128;
`;

export const LetterTier = styled.div`
  margin-right: 8px;
  font-size: 24px;
  color: #dcdcdc;
  font-family: Pretendard-bold;
  ${(props: ITierProps) => {
    if (props.tier === "diamond") {
      return `color: #99d4ff;`;
    } else if (props.tier === "platinum") {
      return `color: #b6f9d9;`;
    } else if (props.tier === "gold") {
      return `color: #e5ae5b;`;
    } else if (props.tier === "silver") {
      return `color: #d3d3d3;`;
    } else if (props.tier === "bronze") {
      return `color: #b56a2b;`;
    }
  }};
`;

export const IconTier = styled.img`
  width: 16px;
`;
