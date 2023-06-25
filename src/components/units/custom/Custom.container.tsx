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
  // 🚨 방장 정보 받고 수정하기
  const [isHost, setIsHost] = useState(true);

  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);
  const [isNotHostModalOpen, setIsNotHostModalOpen] = useState(false);

  const onClickExit = () => {
    socket?.emit("leave_room", userId);
    router.push("/main");
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
    socket?.on("create_custom", (roomId) => {
      setRoomInfo((prev) => ({ ...prev, roomId: String(roomId) }));
    });

    socket?.on("invite", (data) => {
      console.log("INVITE", data);
      const newPlayersInfo: IPlayersData[] = [];

      setPlayersData((prevPlayers) => {
        data.forEach((playerGameDto) => {
          // 이미 들어와있는 유저인지 확인
          let isDuplicate = false;
          newPlayersInfo.forEach((newPlayer) => {
            if (newPlayer.userId === playerGameDto.userId) isDuplicate = true;
          });

          // 새로운 유저인 경우에만 추가
          if (!isDuplicate) {
            newPlayersInfo.push({
              userId: playerGameDto.userId,
              userTier: playerGameDto.userTier,
              nickname: playerGameDto.nickname,
              character: playerGameDto.character,
              isHost: playerGameDto.userId === playerGameDto.hostId,
              isFriend:
                playerGameDto.isFriend && userId !== playerGameDto.userId,
            });
            if (
              // 현재 유저가 방장이면
              playerGameDto.isHost &&
              playerGameDto.userId === userId
            )
              setIsHost(true);
          }
        });
        // 인원 수 수정
        setRoomInfo((prev) => ({
          ...prev,
          playerCount: [...prevPlayers, ...newPlayersInfo].length,
        }));
        return [...prevPlayers, ...newPlayersInfo];
      });
    });

    // 다른 유저가 방을 나감
    socket?.on("leave_room", (leavedUserNickname: string) => {
      setPlayersData((prevPlayers) => {
        const newPlayers = prevPlayers.filter(
          (player) => player.nickname !== leavedUserNickname
        );
        // 인원 수 수정
        setRoomInfo((prev) => ({
          ...prev,
          playerCount: newPlayers.length,
        }));
        return newPlayers;
      });
    });

    // 게임 시작
    socket?.on("custom_start", () => {
      // 아이템전
      if (roomInfo.mode === "아이템") router.push("/game");
      // 일반전
      else router.push("/game/normal");
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
