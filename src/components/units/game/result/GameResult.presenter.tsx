import Header from "../../../commons/layout/header/Header";
import ProfileCard from "../../../commons/profileCard/ProfileCard";
import * as S from "./GameResult.styles";
import Button, { buttonType } from "../../../commons/button/Button";
import { useRouter } from "next/router";
import { IGameResultUIProps } from "./GameResult.types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";

export default function GameResultUI(props: IGameResultUIProps) {
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);

  const [mmr, setMMR] = useState(0);
  useEffect(() => {
    let startTimestamp = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
      setMMR(progress * props.currentUserResult.mmrDiff);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [props.currentUserResult.mmrDiff]);

  return (
    <>
      <Header text="게임 결과" noPrev />
      <S.RankWrapper>
        {props.gameResult.map((el, i: number) => {
          return (
            <S.Rank key={i}>
              <div>
                <S.Ranking>{i + 1}</S.Ranking>
                <ProfileCard
                  character={el.charcter}
                  nickname={el.nickname}
                  tier={el.tier}
                  add={!el.isFriend && el.userId !== userId}
                />
              </div>
              <S.Mmr>{el.userScore}</S.Mmr>
            </S.Rank>
          );
        })}
      </S.RankWrapper>
      <S.TierWrapper>
        <S.OutCircle tier={props.currentUserResult.tier}>
          <S.InCircle tier={props.currentUserResult.tier}>
            <S.TierIcon src={`/tier/${props.currentUserResult.tier}.png`} />
            <S.TierText tier={props.currentUserResult.tier}>
              {props.currentUserResult.tier.toUpperCase()}
            </S.TierText>
            <S.MmrDiff tier={props.currentUserResult.tier}>
              {`${mmr >= 0 ? "+" : ""}${Math.floor(mmr)}`}
            </S.MmrDiff>
          </S.InCircle>
        </S.OutCircle>
      </S.TierWrapper>
      <Button
        text="메인으로"
        isFixedAtBottom
        buttonType={buttonType.GRADATION}
        onClick={() => router.push("/main")}
      />
    </>
  );
}
