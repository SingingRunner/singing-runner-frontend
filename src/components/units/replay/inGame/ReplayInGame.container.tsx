import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import Game from "../../game/Game.container";
import { PollingContext } from "../../../../commons/contexts/PollingContext";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";

export default function ReplayInGame() {
  const pollingContext = useContext(PollingContext);
  if (!pollingContext) return <div>Loading...</div>;
  const { setIsPolling } = pollingContext;
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect } = socketContext;

  const [userId] = useRecoilState(userIdState);
  useEffect(() => {
    setIsPolling(false);
    socketConnect(userId);
  }, []);

  return <Game preventEvent={true} isReplay={true} />;
}
