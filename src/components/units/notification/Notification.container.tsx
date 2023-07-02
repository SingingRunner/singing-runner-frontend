import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isNotificationState, userIdState } from "../../../commons/store";
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
import moment from "moment";

export default function Notification() {
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
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

  const [, setIsNotification] = useRecoilState(isNotificationState);
  useEffect(() => {
    // 페이지가 렌더링 될 때 마다 사용자 정보 새로 불러옴
    refetch();
    // 메인 화면의 알림 빨간 불 제거
    setIsNotification(false);
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

  // 시간 단위로 변환하는 함수
  const convertTimeToUnit = (receivedAt: string) => {
    if (!receivedAt) {
      return "알 수 없음";
    }

    const receivedAtDate = moment(receivedAt).toDate();
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.valueOf() - receivedAtDate.valueOf()) / 1000
    ); // 초 단위 차이 계산

    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 60 * 60) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 60 * 60 * 24) {
      const hours = Math.floor(diffInSeconds / (60 * 60));
      return `${hours}시간 전`;
    } else if (diffInSeconds < 60 * 60 * 24 * 30) {
      const days = Math.floor(diffInSeconds / (60 * 60 * 24));
      return `${days}일 전`;
    } else if (diffInSeconds < 60 * 60 * 24 * 365) {
      const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
      return `${months}달 전`;
    } else {
      const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
      return `${years}년 전`;
    }
  };

  const onClickCheck = (friendId: string, sender: string) => () => {
    setSenderName(sender);
    setSenderId(friendId);
    setIsCheckClicked(true);
  };

  const onClickAccept = async () => {
    await addFriendMutation({
      variables: {
        addFriendDto: {
          userId,
          friendId: senderId,
        },
      },
    });

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
    convertTimeToUnit,
  };

  return <NotificationUI {...props} />;
}
