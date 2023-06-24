import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import Game from "../../game/Game.container";

export default function ReplayInGame() {
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect } = socketContext;

  useEffect(() => {
    socketConnect();
  }, []);
  return (
    <>
      <Game preventEvent={true} />
    </>
  );
}
