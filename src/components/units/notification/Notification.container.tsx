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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

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
            ...(prev.getNotification || []),
            ...(fetchMoreResult.getNotification || []),
          ],
        };
      },
    });
  };

  dayjs.locale("ko"); // 언어를 한국어로 설정
  dayjs.extend(relativeTime); // 플러그인 활성화

  // 시간 단위로 변환하는 함수
  const convertTimeToUnit = (receivedAt: string) => {
    if (!receivedAt) {
      return "알 수 없음";
    }

    return dayjs().to(dayjs(receivedAt));
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
