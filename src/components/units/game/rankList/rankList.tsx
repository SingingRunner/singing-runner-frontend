import styled from "@emotion/styled";
import { memo, useEffect, useState } from "react";

function RankList(props: IRankListProps) {
  const [sortedData, setSortedData] = useState<
    Array<{
      activeItem: string;
      score: number;
      idx: number;
    }>
  >();
  useEffect(() => {
    if (props.playersScore) {
      const data = ["", "", ""].map((_, i) => ({
        activeItem: props.playersActiveItem[i],
        score: props.playersScore[i],
        idx: i,
      }));
      const temp = data?.sort((a, b) => b.score - a.score);
      setSortedData([...temp]);
    }
  }, [...props.playersScore, props.playersActiveItem]);

  return (
    <RankWrapper>
      {sortedData?.map((el, i) => {
        return (
          <Rank key={i} isCurrentUser={el.idx === 0}>
            <span>{i + 1}</span>
            <Profile
              isCurrentUser={el.idx === 0}
              src={`/game/player/profile/cat2.png`}
            />
            {el.activeItem && (
              <ItemEffect src={`/game/item/effect/${el.activeItem}.png`} />
            )}
            <span>{el.score}</span>
          </Rank>
        );
      })}
    </RankWrapper>
  );
}
export default memo(RankList);

const RankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 200px;
  left: 8px;
`;

const Rank = styled.div`
  position: relative;
  margin-bottom: 10px;
  span:first-of-type {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props: { isCurrentUser: boolean }) =>
      props.isCurrentUser ? `#6400ff` : ` #1a1128`};
    width: 22px;
    height: 22px;
    border-radius: 100%;
    color: #fff;
    font-weight: 700;
  }
  span:last-of-type {
    position: absolute;
    right: 0;
    bottom: 8px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    text-shadow: -1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128;
  }
`;

const Profile = styled.img`
  width: 68px;
  height: 68px;
  border: 6px solid #1a1128;
  border-radius: 100%;
  border: ${(props: { isCurrentUser: boolean }) =>
    props.isCurrentUser ? `6px solid #6400ff` : `6px solid #1a1128`};
`;

const ItemEffect = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
`;

interface IRankListProps {
  playersActiveItem: string[];
  playersScore: number[];
}
