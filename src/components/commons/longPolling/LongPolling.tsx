import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { isNotificationState, userIdState } from "../../../commons/store";
import {
  IMutation,
  IMutationLongPollingArgs,
} from "../../../commons/types/generated/types";
import Modal from "../modal/Modal";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRouter } from "next/router";
import { LONG_POLLING_MUTATION } from "./LongPolling.queries";
import { PollingContext } from "../../../commons/contexts/PollingContext";

export default function LongPolling() {
  const router = useRouter();
  const pollingContext = useContext(PollingContext);
  if (!pollingContext) return <div>Loading...</div>;
  const { isPolling, setIsPolling } = pollingContext;
  const pollingRef = useRef(isPolling);
  pollingRef.current = isPolling;
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socketConnect } = socketContext;

  const [userId] = useRecoilState(userIdState);

  // 친구 요청이 있으면 true
  const [, setIsNotification] = useRecoilState(isNotificationState);
  const [hostNickname, setHostNickname] = useState("");
  const [hostId, setHostId] = useState("");

  const [longPolling, { data }] = useMutation<
    Pick<IMutation, "longPolling">,
    IMutationLongPollingArgs
  >(LONG_POLLING_MUTATION);

  useEffect(() => {
    console.log(userId);
    console.log(pollingRef.current);
    const pollData = async () => {
      while (pollingRef.current) {
        console.log(pollingRef.current);
        try {
          const response = await longPolling({ variables: { userId } });
          if (response) {
            // pollData(); // recursively call the polling function after response received
            console.log(response);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    pollData();
  }, [longPolling, userId, isPolling]);

  useEffect(() => {
    console.log("롱폴링 데이터", data);
    // 친구 요청이 있으면
    if (data?.longPolling.userNotificationList[0]) {
      setIsNotification(true);
      console.log("친구 요청이 있다");
    }
    // 친구 요청이 없으면
    else setIsNotification(false);

    // 초대 요청이 있으면
    if (!hostNickname && data?.longPolling.hostUserDtoList[0]) {
      setHostNickname(data?.longPolling.hostUserDtoList[0].nickname);
      setHostId(data?.longPolling.hostUserDtoList[0].userId);
      console.log("초대 요청이 있다");
    }
  }, [data]);

  const onClickAcceptInvite = () => {
    setIsPolling(false);
    const newSocket = socketConnect();
    newSocket?.emit("invite", {
      userId,
      HostUserDto: {
        userId: hostId,
        nickname: hostNickname,
      },
    });
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
