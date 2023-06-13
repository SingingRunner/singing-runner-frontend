// 전체 플레이어의 랭킹 (🚨 가데이터)
import styled from "@emotion/styled";
import { memo } from "react";
const RankList = (props: IRankListProps) => {
  console.log("여기 왜 안 바뀌어", props.playersActiveItem);
  return (
    <RankWrapper>
      <Rank>
        <span>1</span>
        <Profile src="/game/player/profile/cat.png" />
        {props.playersActiveItem[0] && (
          <ItemEffect
            src={`/game/item/effect/${props.playersActiveItem[0]}.png`}
          />
        )}
        <span>99</span>
      </Rank>
      <Rank>
        <span>2</span>
        <Profile src="/game/player/profile/cat.png" />
        {props.playersActiveItem[1] && (
          <ItemEffect
            src={`/game/item/effect/${props.playersActiveItem[0]}.png`}
          />
        )}

        <span>95</span>
      </Rank>
      <Rank>
        <span>3</span>
        <Profile src="/game/player/profile/cat.png" />
        {props.playersActiveItem[2] && (
          <ItemEffect
            src={`/game/item/effect/${props.playersActiveItem[0]}.png`}
          />
        )}
        <span>88</span>
      </Rank>
    </RankWrapper>
  );
};
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
    background-color: #1a1128;
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
}
