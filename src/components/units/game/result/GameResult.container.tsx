import { gameResultState, userIdState } from "../../../../commons/store";
import { useRecoilState } from "recoil";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USER } from "./GameResult.queries";
import GameResultUI from "./GameResult.presenter";
import {
  IQuery,
  IQueryFetchUserArgs,
} from "../../../../commons/types/generated/types";
import { SocketContext } from "../../../../commons/contexts/SocketContext";

export default function GameResult() {
  // 소켓, 소켓 끊는 함수 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketDisconnect } = socketContext;

  const [gameResult] = useRecoilState(gameResultState);

  const [userId] = useRecoilState(userIdState);
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId") || "");
  // }, []);
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

  // 소켓 연결 끊기
  socketDisconnect();

  return (
    <GameResultUI
      gameResult={gameResult}
      currentUserResult={currentUserResult}
    />
  );
}
