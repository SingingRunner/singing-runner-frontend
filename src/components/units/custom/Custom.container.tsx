import { useRouter } from "next/router";
import CustomUI from "./Custom.presenter";
import { useContext, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  globalModalState,
  roomInfoState,
  userIdState,
} from "../../../commons/store";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useCustomRoomInfo } from "../../../commons/hooks/useCustomRoomInfo";

export default function Custom() {
  const router = useRouter();

  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket, socketDisconnect } = socketContext;

  const [userId] = useRecoilState(userIdState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);

  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);
  const [isNotHostModalOpen, setIsNotHostModalOpen] = useState(false);

  const [, setGlobalModal] = useRecoilState(globalModalState);

  useEffect(() => {
    // 방장인 경우 유저 정보 로드에 실패하면 퇴장 처리
    if (!roomInfo.hostId) {
      setGlobalModal((prev) => ({
        ...prev,
        isOpen: true,
        firstText: "방 생성에 실패했습니다. 다시 시도해주세요.",
        buttonText: "확인",
        onClickRight: () => {
          onClickExit();
        },
      }));
    }
  }, []);

  useCustomRoomInfo();

  const onClickExit = () => {
    socket?.emit("leave_room", userId, () => {
      socketDisconnect();
    });
    resetRoomInfo();
    router.push("/main");
  };

  const onClickMode = () => {
    if (roomInfo.hostId !== userId) {
      setIsNotHostModalOpen(true);
      return;
    }
    const changedMode = roomInfo.mode === "아이템" ? "일반" : "아이템";
    socket?.emit("game_mode", { userId, gameMode: changedMode === "아이템" });
    setRoomInfo((prev) => ({ ...prev, mode: changedMode }));
  };

  const onClickSong = () => {
    if (roomInfo.hostId !== userId) {
      setIsNotHostModalOpen(true);
      return;
    }
    router.push("/custom/song");
  };

  const onClickGameStart = () => {
    socket?.emit("custom_start", { userId });
  };

  return (
    <CustomUI
      userId={userId}
      isHost={roomInfo.hostId === userId}
      roomInfo={roomInfo}
      onClickMode={onClickMode}
      onClickSong={onClickSong}
      onClickGameStart={onClickGameStart}
      onClickExit={onClickExit}
      isSongModalOpen={isSongModalOpen}
      isPrevModalOpen={isPrevModalOpen}
      isNotHostModalOpen={isNotHostModalOpen}
      setIsSongModalOpen={setIsSongModalOpen}
      setIsPrevModalOpen={setIsPrevModalOpen}
      setIsNotHostModalOpen={setIsNotHostModalOpen}
    />
  );
}
