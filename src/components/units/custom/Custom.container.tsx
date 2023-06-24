import { useRouter } from "next/router";
import CustomUI from "./Custom.presenter";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { roomInfoState, userIdState } from "../../../commons/store";
import { IPlayersData } from "./Custom.types";
import { SocketContext } from "../../../commons/contexts/SocketContext";

export default function Custom() {
  const router = useRouter();
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [userId] = useRecoilState(userIdState);
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId") || "");
  // }, []);

  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [isHost, setIsHost] = useState(false);

  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);
  const [isNotHostModalOpen, setIsNotHostModalOpen] = useState(false);

  const onClickExit = () => {
    socket?.emit("leave_room", userId);
    router.back();
  };

  const onClickMode = () => {
    if (!isHost) {
      setIsNotHostModalOpen(true);
      return;
    }
    if (roomInfo.mode === "아이템")
      setRoomInfo((prev) => ({ ...prev, mode: "일반" }));
    else setRoomInfo((prev) => ({ ...prev, mode: "아이템" }));
  };

  const onClickSong = () => {
    if (!isHost) {
      setIsNotHostModalOpen(true);
      return;
    }
    router.push("/custom/song");
  };

  const onClickGameStart = () => {
    socket?.emit("custom_start");
  };

  const [playersData, setPlayersData] = useState<IPlayersData[]>([]);

  useEffect(() => {
    socket?.on("invite", (data) => {
      const newPlayersInfo: IPlayersData[] = [];

      setPlayersData((prevPlayers) => {
        data.forEach((playerGameDto) => {
          // 이미 들어와있는 유저인지 확인
          let isDuplicate = false;
          prevPlayers.forEach((prevPlayer) => {
            if (
              prevPlayer.userId ===
              playerGameDto.userGameDto.userMatchDTO.userId
            )
              isDuplicate = true;
          });

          // 새로운 유저인 경우에만 추가
          if (!isDuplicate) {
            newPlayersInfo.push({
              userId: playerGameDto.userGameDto.userMatchDTO.userId,
              userTier: playerGameDto.userGameDto.userMatchDTO.userTier,
              nickname: playerGameDto.userGameDto.userMatchDTO.nickname,
              character: playerGameDto.userGameDto.userMatchDTO.character,
              isHost: false, // 🚨
              isFriend: false, // 🚨
            });
            if (
              // 현재 유저가 방장이면
              playerGameDto.userGameDto.userMatchDTO.isHost &&
              playerGameDto.userGameDto.userMatchDTO.userId === userId
            )
              setIsHost(true);
          }
        });
        return [...prevPlayers, ...newPlayersInfo];
      });
    });

    // 게임 시작
    socket?.on("custom_start", () => {
      router.push("/game");
    });
  }, [socket]);

  return (
    <CustomUI
      isHost={isHost}
      roomInfo={roomInfo}
      playersData={playersData}
      onClickExit={onClickExit}
      onClickMode={onClickMode}
      onClickSong={onClickSong}
      onClickGameStart={onClickGameStart}
      isSongModalOpen={isSongModalOpen}
      setIsSongModalOpen={setIsSongModalOpen}
      isPrevModalOpen={isPrevModalOpen}
      setIsPrevModalOpen={setIsPrevModalOpen}
      isNotHostModalOpen={isNotHostModalOpen}
      setIsNotHostModalOpen={setIsNotHostModalOpen}
    />
  );
}
