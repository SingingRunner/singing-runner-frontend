import { gameResultState, userIdState } from "../../../../commons/store";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USER } from "./GameResult.queries";
import GameResultUI from "./GameResult.presenter";
import {
  IQuery,
  IQueryFetchUserArgs,
} from "../../../../commons/types/generated/types";

export default function GameResult() {
  const [gameResult] = useRecoilState(gameResultState);

  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);
  const { data } = useQuery<Pick<IQuery, "fetchUser">, IQueryFetchUserArgs>(
    FETCH_USER,
    { variables: { userId } }
  );

  const [currentUserResult, setCurrentUserResult] = useState({
    mmrDiff: -100,
    tier: "bronze",
  });

  useEffect(() => {
    gameResult.forEach((el) => {
      if (el.userId === userId) {
        setCurrentUserResult({ mmrDiff: el.mmrDiff, tier: el.tier });
      }
    });
  }, [data]);

  return (
    <GameResultUI
      gameResult={gameResult}
      currentUserResult={currentUserResult}
    />
  );
}
