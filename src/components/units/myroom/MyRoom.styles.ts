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
  margin-bottom: 200px;
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
  // 또는 사용할 placeholder 이미지: background-image: url('/path/to/placeholder-image.png');
`;

export const Nickname = styled.div`
  margin-left: 12px;
  margin-top: 14px;
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

export const PlaceholderMmr = styled.div`
  height: 14px;
  margin-right: 12px;
  font-size: 12px;
  text-shadow: -1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128;
  color: transparent; // 텍스트 색상을 투명하게 만들어 레이아웃에 영향을 주지 않도록 함.
`;

export const Tier = styled.div`
  display: flex;
  align-items: center;
`;

export const PlaceholderIconTier = styled.div`
  width: 16px;
  height: 16px;
  background-color: #1a1128;
  // 또는 사용할 placeholder 이미지: background-image: url('/path/to/placeholder-image.png');
`;

export const LetterTier = styled.div`
  margin-right: 8px;
  font-size: 24px;
  color: #dcdcdc;
  font-family: Pretendard-bold;
  ${(props: ITierProps) => {
    if (props.tier === "DIAMOND") {
      return `color: #99d4ff;`;
    } else if (props.tier === "PLATINUM") {
      return `color: #b6f9d9;`;
    } else if (props.tier === "GOLD") {
      return `color: #e5ae5b;`;
    } else if (props.tier === "SILVER") {
      return `color: #d3d3d3;`;
    } else if (props.tier === "BRONZE") {
      return `color: #b56a2b;`;
    }
  }};
`;

export const IconTier = styled.img`
  width: 16px;
`;
