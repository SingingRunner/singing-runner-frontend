import { useContext, useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  globalModalState,
  isNotificationState,
  roomInfoState,
  userIdState,
} from "../../../commons/store";

import Modal from "../modal/Modal";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRouter } from "next/router";
import {
  IOnInviteHandlerData,
  IPlayers,
} from "../../units/custom/Custom.types";

export default function ServerSentEvents() {
  const router = useRouter();

  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect, socketDisconnect } = socketContext;

  const userId = useAtomValue(userIdState);
  const setRoomInfo = useSetAtom(roomInfoState);
  const setGlobalModal = useSetAtom(globalModalState);

  // 친구 요청이 있으면 true
  const setIsNotification = useSetAtom(isNotificationState);
  const [hostNickname, setHostNickname] = useState("");
  const [hostId, setHostId] = useState("");

  useEffect(() => {
    if (!userId) return;
    const eventSourceInvite = new EventSource(
      // `http://localhost:3000/social/invite/${userId}`
      `https://${window.location.host}/api/social/invite/${userId}`
    );
    const eventSourceNoti = new EventSource(
      // `http://localhost:3000/social/notification/${userId}`
      `https://${window.location.host}/api/social/notification/${userId}`
    );

    eventSourceInvite.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.host.userId) {
        setHostId(parsedData.host.userId);
        setHostNickname(parsedData.host.nickname);
      }
    };
    // eventSourceInvite.onerror = function (error) {
    //   console.error("Error occurred:", error);
    // };
    eventSourceNoti.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.alarm) setIsNotification(true);
      else setIsNotification(false);
    };

    // eventSourceNoti.onerror = function (error) {
    //   console.error("Error occurred:", error);
    // };

    return () => {
      eventSourceInvite.close();
      eventSourceNoti.close();
    };
  }, [userId]);

  const onClickAcceptInvite = async () => {
    const newSocket = socketConnect(userId);
    newSocket?.emit(
      "invite",
      {
        userId,
        HostUserDto: {
          userId: hostId,
          nickname: hostNickname,
        },
      },
      async (response: { message: string; data: IOnInviteHandlerData[] }) => {
        if (response.message === "full") {
          setGlobalModal((prev) => ({
            ...prev,
            isOpen: true,
            firstText: "방이 꽉 찼어요 😥",
            buttonText: "확인",
            onClickRight: () => {
              setHostNickname("");
            },
          }));
          socketDisconnect();
        } else if (response.message === "inGame") {
          setGlobalModal((prev) => ({
            ...prev,
            isOpen: true,
            firstText: "게임이 이미 시작되었어요 😥",
            buttonText: "확인",
            onClickRight: () => {
              setHostNickname("");
            },
          }));
          socketDisconnect();
        } else {
          setHostNickname("");
          onInviteHandler(response.data);
          router.push("/custom");
        }
      }
    );
  };

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

  const onClickDenyInvite = () => {
    setHostNickname("");
  };

  return (
    <div>
      {hostNickname && (
        <Modal
          hilightText={hostNickname}
          firstText="님의"
          secondText="초대가 도착했어요!"
          onClickRight={onClickAcceptInvite}
          onClickLeft={onClickDenyInvite}
          leftButtonText="거절하기"
          buttonText="참여하기"
        />
      )}
    </div>
  );
}
