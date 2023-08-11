import Header from "../../../commons/layout/header/Header";
import ProfileCard from "../../../commons/profileCard/ProfileCard";
import * as S from "./GameResult.styles";
import Button, { buttonType } from "../../../commons/button/Button";
import { useRouter } from "next/router";
import { IGameResultUIProps } from "./GameResult.types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import { S3_PATH } from "../../../../commons/constants/Constants";

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
        {(() => {
          let rank = 1;
          let prevScore = -1;
          return props.gameResult.map((el, i: number) => {
            if (i !== 0 && el.userScore !== prevScore) rank++;
            prevScore = el.userScore;
            return (
              <S.Rank key={i}>
                <div>
                  <S.Ranking>{rank}</S.Ranking>
                  <ProfileCard
                    character={el.charcter}
                    nickname={el.nickname}
                    tier={el.tier}
                    add={!el.isFriend && el.userId !== userId}
                    friendId={el.userId}
                  />
                  {el.userId === userId && <S.CurrentUser>나</S.CurrentUser>}
                </div>
                <S.Mmr>{el.userScore}</S.Mmr>
              </S.Rank>
            );
          });
        })()}
      </S.RankWrapper>
      <S.TierWrapper>
        <S.OutCircle tier={props.currentUserResult.tier}>
          <S.InCircle tier={props.currentUserResult.tier}>
            <S.TierIcon
              src={`${S3_PATH}/tier/${props.currentUserResult.tier}.png`}
            />
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
