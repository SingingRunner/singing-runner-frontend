import { useRouter } from "next/router";
import CustomUI from "./Custom.presenter";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { roomInfoState } from "../../../commons/store";
import { IRoomInfoState } from "./Custom.types";

const INITIAL_ROOM_INFO_STATE: IRoomInfoState = {
  rival1: undefined,
  rival2: undefined,
  mode: "아이템",
  singer: "",
  songTitle: "",
};

export default function Custom() {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  console.log(roomInfo, "커스텀");

  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);

  const onClickExit = () => {
    setRoomInfo({ ...INITIAL_ROOM_INFO_STATE });
    router.back();
  };

  const onClickMode = () => {
    if (roomInfo.mode === "아이템")
      setRoomInfo((prev) => ({ ...prev, mode: "일반" }));
    else setRoomInfo((prev) => ({ ...prev, mode: "아이템" }));
  };

  const onClickGameStart = () => {
    if (!roomInfo.songTitle) setIsSongModalOpen(true);
    // 🚨 게임 시작 api
  };

  return (
    <CustomUI
      roomInfo={roomInfo}
      onClickExit={onClickExit}
      onClickMode={onClickMode}
      onClickGameStart={onClickGameStart}
      isSongModalOpen={isSongModalOpen}
      setIsSongModalOpen={setIsSongModalOpen}
      isPrevModalOpen={isPrevModalOpen}
      setIsPrevModalOpen={setIsPrevModalOpen}
    />
  );
}
