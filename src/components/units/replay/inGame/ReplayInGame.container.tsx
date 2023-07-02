import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import Game from "../../game/Game.container";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import { useRouter } from "next/router";

export default function ReplayInGame() {
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect } = socketContext;

  const [userId] = useRecoilState(userIdState);
  useEffect(() => {
    socketConnect(userId);
  }, []);

  const router = useRouter();

  return <Game isReplay={true} playerId={String(router.query.userId)} />;
}
