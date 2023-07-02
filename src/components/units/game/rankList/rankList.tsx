import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IPlayersInfo } from "../Game.types";
import { userIdState } from "../../../../commons/store";
import { useRecoilState } from "recoil";

interface IRankListProps {
  playerId?: string;
  playersInfo: IPlayersInfo[];
  isTerminated: boolean;
}

export default function RankList(props: IRankListProps) {
  // 현재 플레이어의 정보
  const [userId] = useRecoilState(userIdState);
  /** 플레이어: 인게임인 경우 현재 유저, 리플레이인 경우 해당 리플레이의 유저 */
  const [playerId] = useState(props.playerId || userId);

  const [sortedData, setSortedData] = useState<IPlayersInfo[]>();
  useEffect(() => {
    const temp = props.playersInfo?.sort((a, b) => b.score - a.score);
    setSortedData([...temp]);
  }, [props.playersInfo]);

  return (
    <RankWrapper isTerminated={props.isTerminated}>
      {(() => {
        let rank = 1;
        let prevScore = -1;
        return sortedData?.map((el, i) => {
          if (i !== 0 && el.score !== prevScore) rank++;
          prevScore = el.score;
          return (
            <Rank
              key={i}
              isCurrentUser={el.userId === playerId}
              isTerminated={props.isTerminated}
              isDamaged={["mute", "frozen"].includes(el.activeItem)}
            >
              <span>{rank}</span>
              <ProfileCard
                isCurrentUser={el.userId === playerId}
                src={`/game/player/profile/${el.character}.png`}
              />
              {el.activeItem && !props.isTerminated && (
                <ItemEffect
                  isCurrentUser={el.userId === playerId}
                  src={`/game/item/effect/${el.activeItem}.png`}
                />
              )}
              <span>{el.score}</span>
            </Rank>
          );
        });
      })()}
    </RankWrapper>
  );
}

const RankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 200px;
  left: 8px;
  ${(props: { isTerminated: boolean }) => {
    return props.isTerminated
      ? `
        flex-direction: row;
        aign-items: center;
        justify-content: center;
        width: 100%;
        top: 120px;
        left: 0;
        `
      : ``;
  }}
`;
interface CardProps {
  isTerminated?: boolean;
  isCurrentUser?: boolean;
  isDamaged?: boolean;
}

const Rank = styled.div<CardProps>`
  position: relative;
  margin-bottom: 10px;
  ${(props) => props.isTerminated && `margin: 0 16px;`}

  span:first-of-type {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.isCurrentUser ? `#6400ff` : `#1a1128`};
    width: ${(props) => (props.isCurrentUser ? `30px` : `22px`)};
    height: ${(props) => (props.isCurrentUser ? `30px` : `22px`)};
    font-size: ${(props) => (props.isCurrentUser ? `20px` : `14px`)};
    border-radius: 100%;
    color: #fff;
    font-weight: 700;
  }

  span:last-of-type {
    position: absolute;
    right: ${(props) => (props.isCurrentUser ? `0` : `20px`)};
    bottom: 8px;
    font-weight: 700;
    text-align: center;

    color: ${(props) => (props.isDamaged ? `#fff` : `#fff`)};
    text-shadow: ${(props) =>
      props.isDamaged && !props.isTerminated
        ? `-2px 0 red, 0 2px red, 2px 0 red, 0 -2px red`
        : `-1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128`};
    /* text-shadow: -1px 0 #1a1128, 0 1px #1a1128, 1px 0 #1a1128, 0 -1px #1a1128; */
    font-size: ${(props) => (props.isCurrentUser ? `20px` : `14px`)};
  }
`;

const ProfileCard = styled.img<CardProps>`
  border-radius: 100%;
  border: ${(props) =>
    props.isCurrentUser ? `6px solid #6400ff` : `6px solid #1a1128`};
  width: ${(props) => (props.isCurrentUser ? `80px` : `60px`)};
  height: ${(props) => (props.isCurrentUser ? `80px` : `60px`)};
`;

const ItemEffect = styled.img<CardProps>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.isCurrentUser ? `0` : `20px`)};
  width: 28px;
  height: 28px;
`;
