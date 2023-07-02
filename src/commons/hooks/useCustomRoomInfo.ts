import { SocketContext } from "../contexts/SocketContext";
import { useRecoilState, useResetRecoilState } from "recoil";
import { globalModalState, roomInfoState, userIdState } from "../store";
import { useRouter } from "next/router";
import {
  IOnInviteHandlerData,
  IOnSetSongHandlerData,
  IPlayers,
} from "../../components/units/custom/Custom.types";
import { useContext, useEffect } from "react";

/** 소켓 이벤트들을 수신하는 커스텀 훅 */
export const useCustomRoomInfo = () => {
  const router = useRouter();

  const socketContext = useContext(SocketContext);
  if (!socketContext) return null;
  const { socket, socketDisconnect } = socketContext;

  const [userId] = useRecoilState(userIdState);
  const [, setRoomInfo] = useRecoilState(roomInfoState);
  const [, setGlobalModal] = useRecoilState(globalModalState);
  const resetRoomInfoState = useResetRecoilState(roomInfoState);

  useEffect(() => {
    // 유저가 방에 들어옴
    socket?.on("invite", onInviteHandler);
    // 노래가 변경됨
    socket?.on("set_song", onSetSongHandler);
    // 게임 모드가 변경됨
    socket?.on("game_mode", onGameModeHandler);
    // 다른 유저가 방을 나감
    socket?.on("leave_room", onLeaveRoomHandler);
    // 게임 시작
    socket?.on("custom_start", onGameStartHandler);

    return () => {
      socket?.off("invite", onInviteHandler);
      socket?.off("set_song", onSetSongHandler);
      socket?.off("game_mode", onGameModeHandler);
      socket?.off("leave_room", onLeaveRoomHandler);
      socket?.off("custom_start", onGameStartHandler);
    };
  }, [socket]);

  const onInviteHandler = (data: IOnInviteHandlerData[]) => {
    setRoomInfo((prev) => {
      // 플레이어 정보
      const players: IPlayers[] = [];
      data.forEach((el) => {
        players.push({
          userId: el.userId,
          nickname: el.nickname,
          character: el.character,
          userTier: el.userTier,
          isFriend: el.isFriend && userId !== el.userId,
          isHost: el.userId === el.hostId,
        });
      });

      return {
        ...prev,
        roomId: String(data[0].roomId),
        hostId: data[0].hostId,
        hostNickname: data[0].hostNickname,
        songId: data[0].songId,
        songTitle: data[0].songTitle,
        singer: data[0].singer,
        mode: data[0].gameMode,
        isHost: data[0].hostId === userId,
        players,
      };
    });
  };

  const onSetSongHandler = (data: IOnSetSongHandlerData) => {
    setRoomInfo((prev) => ({
      ...prev,
      songTitle: data.songTitle,
      singer: data.singer,
      songId: data.songId,
    }));
  };

  const onGameModeHandler = (gameMode: boolean) => {
    setRoomInfo((prev) => ({
      ...prev,
      mode: gameMode ? "아이템" : "일반",
    }));
  };

  const onLeaveRoomHandler = (leavedUserNickname: string) => {
    let isHost = false;
    setRoomInfo((prev) => {
      if (prev.hostNickname === leavedUserNickname) isHost = true;
      const players = prev.players.filter(
        (player) => player.nickname !== leavedUserNickname
      );
      return {
        ...prev,
        players,
      };
    });

    if (isHost) {
      resetRoomInfoState();
      socketDisconnect();
      setGlobalModal((prev) => ({
        ...prev,
        isOpen: true,
        firstText: "방이 삭제되었습니다.",
        buttonText: "확인",
        onClickRight: () => {
          router.push("/main");
        },
      }));
    }
  };

  const onGameStartHandler = () => {
    router.push("/game");
  };
};
