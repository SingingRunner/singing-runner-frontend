import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IPlayersInfo } from "../Game.types";
import { userInfoState } from "../../../../commons/store";
import { useRecoilValue } from "recoil";

interface IRankListProps {
  playersInfo: IPlayersInfo[];
}

export default function RankList(props: IRankListProps) {
  // 현재 플레이어의 정보
  const userInfo = useRecoilValue(userInfoState);
  const [sortedData, setSortedData] = useState<IPlayersInfo[]>();
  useEffect(() => {
    const temp = props.playersInfo?.sort((a, b) => b.score - a.score);
    setSortedData([...temp]);
  }, [props.playersInfo]);

  return (
    <RankWrapper>
      {sortedData?.map((el, i) => {
        return (
          <Rank key={i} isCurrentUser={el.userId === userInfo.userId}>
            <span>{i + 1}</span>
            <Profile
              isCurrentUser={el.userId === userInfo.userId}
              src={`/game/player/profile/${el.character}.png`}
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
