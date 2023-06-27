import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import Game from "../../game/Game.container";
import { PollingContext } from "../../../../commons/contexts/PollingContext";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import Button, { buttonType } from "../../../commons/button/Button";
import { useRouter } from "next/router";

export default function ReplayInGame() {
  const router = useRouter();
  const pollingContext = useContext(PollingContext);
  if (!pollingContext) return <div>Loading...</div>;
  const { setIsPolling } = pollingContext;
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect, socketDisconnect } = socketContext;

  const [userId] = useRecoilState(userIdState);
  useEffect(() => {
    setIsPolling(false);
    // 🚨 친구 아이디? 내 아이디?
    socketConnect(userId);
  }, []);

  return (
    <>
      <Game preventEvent={true} isReplay={true} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          buttonType={buttonType.GRADATION}
          text="나가기"
          isFixedAtBottom
          onClick={() => {
            // 🚨 인게임 퇴장 시 이벤트 추가
            socketDisconnect();
            router.back();
          }}
        />
      </div>
    </>
  );
}
