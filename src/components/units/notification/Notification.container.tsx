import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IQuery,
  IQueryGetNotificationArgs,
} from "../../../commons/types/generated/types";
import NotificationUI from "./Notification.presenter";
import { INotificationUIProps } from "./Notification.types";
import {
  ADD_FRIEND,
  DELETE_NOTIFICATION,
  GET_NOTIFICATION,
} from "./Notification.queries";

export default function Notification() {
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);
  const [isCheckClicked, setIsCheckClicked] = useState(false);
  const [addFriendMutation] = useMutation(ADD_FRIEND);
  const [deleteNotificationMutation] = useMutation(DELETE_NOTIFICATION);
  const [senderName, setSenderName] = useState("");
  const [senderId, setSenderId] = useState("");
  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "getNotification">,
    IQueryGetNotificationArgs
  >(GET_NOTIFICATION, {
    variables: {
      userId,
      page: 1,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // 페이지가 렌더링 될 때 마다 사용자 정보 새로 불러옴
    refetch();
  }, []);

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.getNotification.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getNotification === undefined) {
          return prev;
        }
        return {
          getNotification: [
            ...prev.getNotification,
            ...fetchMoreResult.getNotification,
          ],
        };
      },
    });
  };

  const onClickCheck = (friendId: string, sender: string) => () => {
    setSenderName(sender);
    setSenderId(friendId);
    setIsCheckClicked(true);
    console.log("sender nickname: ", sender);
    console.log("senderId: ", friendId);
  };

  const onClickAccept = async () => {
    console.log("userId: ", userId);
    console.log("senderId: ", senderId);
    await addFriendMutation({
      variables: {
        addFriendDto: {
          userId,
          friendId: senderId,
        },
      },
    });

    console.log("senderId: ", senderId);
    await deleteNotificationMutation({
      variables: {
        notificationDto: {
          userId,
          senderId,
        },
      },
    });
    refetch();

    setIsCheckClicked(false);
  };

  const onClickDeny = async () => {
    setIsCheckClicked(false);

    console.log("userId: ", userId);
    console.log("senderId: ", senderId);
    await deleteNotificationMutation({
      variables: {
        notificationDto: {
          userId,
          senderId,
        },
      },
    });
    refetch();
  };

  // 나가기 버튼 클릭 시 소셜 페이지로 이동
  const onClickExit = () => {
    router.push("/main");
  };

  const props: INotificationUIProps = {
    onClickExit,
    onLoadMore,
    data,
    onClickCheck,
    isCheckClicked,
    onClickAccept,
    onClickDeny,
    senderName,
  };

  return <NotificationUI {...props} />;
}
