import { gameResultState, userIdState } from "../../../../commons/store";
import { useRecoilState } from "recoil";
import { useContext, useEffect, useState } from "react";
import GameResultUI from "./GameResult.presenter";
import { SocketContext } from "../../../../commons/contexts/SocketContext";

export default function GameResult() {
  // 소켓, 소켓 끊는 함수 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketDisconnect } = socketContext;

  const [gameResult] = useRecoilState(gameResultState);

  const [userId] = useRecoilState(userIdState);

  const [currentUserResult, setCurrentUserResult] = useState({
    mmrDiff: 0,
    tier: "bronze",
  });

  useEffect(() => {
    gameResult.forEach((el) => {
      if (el.userId === userId) {
        setCurrentUserResult({
          mmrDiff: el.mmrDiff,
          tier: el.tier,
        });
      }
    });
  }, [gameResult]);

  // 소켓 연결 끊기
  socketDisconnect();

  useEffect(() => {
    const audio = new Audio("/sound/effect/game_reseult.mp3");
    audio.play();
  }, []);

  return (
    <GameResultUI
      gameResult={gameResult}
      currentUserResult={currentUserResult}
    />
  );
}
