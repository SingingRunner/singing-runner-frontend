import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isNotificationState, userIdState } from "../../../commons/store";

import Modal from "../modal/Modal";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRouter } from "next/router";

export default function ServerSentEvents() {
  console.log("롱폴링");
  const router = useRouter();

  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  // const { socketConnect, socketDisconnect } = socketContext;
  const { socketConnect } = socketContext;

  const [userId] = useRecoilState(userIdState);

  // 친구 요청이 있으면 true
  const [, setIsNotification] = useRecoilState(isNotificationState);
  const [hostNickname, setHostNickname] = useState("");
  const [hostId, setHostId] = useState("");

  useEffect(() => {
    console.log("롱폴링 유저 아이디", userId);
    if (!userId) return;
    const eventSourceInvite = new EventSource(
      `http://localhost:3000/social/invite/${userId}`
    );
    const eventSourceNoti = new EventSource(
      `http://localhost:3000/social/notification/${userId}`
    );

    eventSourceInvite.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log("🙂 롱폴링 응답 (초대): ", parsedData);
      if (parsedData.host.userId) {
        setHostId(parsedData.host.userId);
        setHostNickname(parsedData.host.nickname);
      }
    };
    eventSourceInvite.onerror = function (error) {
      console.error("Error occurred:", error);
    };
    eventSourceNoti.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log("🙂 롱폴링 (초대 왔다): ", parsedData);
      if (parsedData.alarm) setIsNotification(true);
      else setIsNotification(false);
    };

    eventSourceNoti.onerror = function (error) {
      console.error("Error occurred:", error);
    };

    return () => {
      eventSourceInvite.close();
      eventSourceNoti.close();
    };
  }, [userId]);

  const onClickAcceptInvite = () => {
    const newSocket = socketConnect(userId);
    newSocket?.emit(
      "invite",
      {
        userId,
        HostUserDto: {
          userId: hostId,
          nickname: hostNickname,
        },
      }
      // (response: string) => {
      //   console.log("invite 응답", response);
      //   if (response === "full") {
      //     alert("꽉참");
      //     socketDisconnect();
      //   } else if (response === "inGame") {
      //     alert("이미 시작함");
      //     socketDisconnect();
      //   } else {
      //     setHostNickname("");
      //     router.push("/custom");
      //   }
      // }
    );
    setHostNickname("");
    router.push("/custom");
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
