import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import {
  IQuery,
  IQuerySearchUserArgs,
} from "../../../../commons/types/generated/types";
import _ from "lodash";
import AddUI from "./Add.presenter";
import { IAddUIProps } from "./Add.types";
import { FRIEND_REQUEST, SEARCH_USER } from './Add.queries';

export default function Add() {
  const router = useRouter();
  const [isRequestClicked, setIsRequestClicked] = useState(false);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [receiverNickname, setReceiverNickname] = useState("");
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "searchUser">,
    IQuerySearchUserArgs
  >(SEARCH_USER, {
    variables: {
      nickname: "",
      page: 1,
    },
    fetchPolicy: "network-only",
  });

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.searchUser.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.searchUser === undefined) {
          return prev;
        }
        return {
          searchUser: [...prev.searchUser, ...fetchMoreResult.searchUser],
        };
      },
    });
  };
  const [friendRequest] = useMutation(FRIEND_REQUEST);

  const getDebounce = useCallback(
    _.debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  };

  const handleAddRequest = (nickname: string, receiverId: string) => () => {
    setReceiverNickname(nickname);
    setIsRequestClicked(true);

    friendRequest({
      variables: {
        notificationDto: {
          userId: receiverId,
          senderId: userId,
        },
      },
    })
      .then((response) => {
        console.log("Add friend request sent:", response);
        console.log("receiverId:", receiverId);
        console.log("senderId:", userId);
      })
      .catch((error) => {
        console.error("Error sending add friend request:", error);
      });
  };

  const onClickModalCheck = () => {
    setIsRequestClicked(false);
  };

  // 나가기 버튼 클릭 시 소셜 페이지로 이동
  const onClickExit = () => {
    router.push("/social");
  };

  const props: IAddUIProps = {
    data,
    handleAddRequest,
    isRequestClicked,
    onChangeNickname,
    onClickExit,
    onClickModalCheck,
    onLoadMore,
    receiverNickname,
  };

  return <AddUI {...props} />;
}
