import styled from "@emotion/styled";

export const RankWrapper = styled.div`
  margin-bottom: 56px;
`;

export const Rank = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
  }
  margin-bottom: 24px;
`;

export const Ranking = styled.span`
  display: flex;
  color: #fff;
  text-align: center;
  text-shadow: 0px 0px 5px #bd00fe;
  font-size: 24px;
  font-weight: 700;
  width: 17px;
  margin-right: 12px;
`;

export const Mmr = styled.span`
  color: #fff;
  font-weight: 700;
`;

export const TierWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const tierColors: { [key in string]: string } = {
  bronze: "#b56a2b",
  silver: "#d3d3d3",
  gold: "#e5af5c",
  platinum: "#b6f9d9",
  dia: "#98d4ff",
};

const defaultColor = "#b56a2b";

export const OutCircle = styled.div<{ tier: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 138px;
  height: 138px;
  border-radius: 138px;
  box-shadow: ${({ tier }) =>
    `0px 0px 16px  ${tierColors[tier] || defaultColor}`};
  border: ${({ tier }) => `3px solid ${tierColors[tier] || defaultColor}`};
`;

export const InCircle = styled.div<{ tier: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 122px;
  height: 122px;
  border-radius: 122px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
  border: ${({ tier }) => `1.5px solid ${tierColors[tier] || defaultColor}`};
`;

export const TierIcon = styled.img`
  width: 29px;
  height: 29px;
  margin-top: 20px;
`;

export const TierText = styled.span<{ tier: string }>`
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  margin: 3px 0;
  color: ${({ tier }) => ` ${tierColors[tier] || defaultColor}`};
`;

export const MmrDiff = styled.span<{ tier: string }>`
  text-align: center;
  font-size: 16px;
  color: ${({ tier }) => ` ${tierColors[tier] || defaultColor}`};
  font-weight: 300;
`;
