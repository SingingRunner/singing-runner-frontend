import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IMutation,
  IMutationAddFriendArgs,
  IMutationDeleteNotificationArgs,
  IMutationLongPollingArgs,
} from "../../../commons/types/generated/types";
import Modal from "../modal/Modal";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRouter } from "next/router";
import {
  ADD_FRIEND,
  DELETE_NOTIFICATION,
  LONG_POLLING_MUTATION,
} from "./LongPolling.queries";

export default function LongPolling() {
  const router = useRouter();
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect } = socketContext;

  const [longPolling, { data }] = useMutation<
    Pick<IMutation, "longPolling">,
    IMutationLongPollingArgs
  >(LONG_POLLING_MUTATION);

  const [addFriend] = useMutation<
    Pick<IMutation, "addFriend">,
    IMutationAddFriendArgs
  >(ADD_FRIEND);
  const [deleteNotification] = useMutation<
    Pick<IMutation, "deleteNotification">,
    IMutationDeleteNotificationArgs
  >(DELETE_NOTIFICATION);

  const [userId] = useRecoilState(userIdState);
  const [shouldPoll, setShouldPoll] = useState(true);

  useEffect(() => {
    console.log(userId);
    const pollData = async () => {
      setShouldPoll(false);
      try {
        await longPolling({ variables: { userId } });
      } catch (error) {
        console.error(error);
      }
      setShouldPoll(true);
    };

    if (shouldPoll) {
      pollData();
    }
  }, [shouldPoll, longPolling, userId]);

  useEffect(() => {
    if (!nickname && data?.longPolling.userNotificationList[0]) {
      setNickname(data?.longPolling.userNotificationList[0].sender.nickname);
      setSenderId(data?.longPolling.userNotificationList[0].sender.userId);
      setShouldPoll(false);
    } else if (!hostNickname && data?.longPolling.hostUserDtoList[0]) {
      setHostNickname(data?.longPolling.hostUserDtoList[0].nickname);
      setHostId(data?.longPolling.hostUserDtoList[0].userId);
      setShouldPoll(false);
    }
  }, [data]);

  const [nickname, setNickname] = useState("");
  const [hostNickname, setHostNickname] = useState("");
  const [hostId, setHostId] = useState("");
  const [senderId, setSenderId] = useState("");
  const onClickAcceptFriendRequest = () => {
    addFriend({ variables: { addFriendDto: { userId, friendId: senderId } } });
    deleteNotification({
      variables: { notificationDto: { userId, senderId } },
    });
    setNickname("");
    setShouldPoll(true);
  };
  const onClickDenyFriendRequest = () => {
    deleteNotification({
      variables: { notificationDto: { userId, senderId } },
    });
    setNickname("");
    setShouldPoll(true);
  };
  const onClickAcceptInvite = () => {
    const newSocket = socketConnect();
    newSocket?.emit("invite", {
      data: {
        userId,
        HostUserDto: {
          userId: hostId,
          nickname: hostNickname,
        },
      },
    });
    setHostNickname("");
    setShouldPoll(true);
    router.push("/custom");
  };
  const onClickDenyInvite = () => {
    // 🚨 초대에 거절하는 api 호출
    setHostNickname("");
    setShouldPoll(true);
  };

  return (
    <div>
      {nickname && (
        <Modal
          hilightText={nickname}
          firstText="님이"
          secondText="친구 요청을 보냈어요!"
          onClickRight={onClickAcceptFriendRequest}
          onClickLeft={onClickDenyFriendRequest}
          leftButtonText="거절하기"
          buttonText="수락하기"
        />
      )}
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
