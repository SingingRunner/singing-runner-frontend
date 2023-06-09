import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import {
  IQuery,
  IQuerySearchUserArgs,
} from "../../../../commons/types/generated/types";
import debounce from "lodash/debounce";
import AddUI from "./Add.presenter";
import { IAddUIProps } from "./Add.types";
import { FRIEND_REQUEST, SEARCH_USER } from "./Add.queries";

export default function Add() {
  const router = useRouter();
  const [isRequestClicked, setIsRequestClicked] = useState(false);
  const [userId] = useRecoilState(userIdState);
  const [keyword, setKeyword] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");

  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "searchUser">,
    IQuerySearchUserArgs
  >(SEARCH_USER, {
    variables: {
      userId,
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
        const prevSearchUser = Array.isArray(prev.searchUser)
          ? prev.searchUser
          : [];
        const newSearchUser = Array.isArray(fetchMoreResult.searchUser)
          ? fetchMoreResult.searchUser
          : [];

        return {
          searchUser: [...prevSearchUser, ...newSearchUser],
        };
      },
    });
  };
  const [friendRequest] = useMutation(FRIEND_REQUEST);

  const getDebounce = useCallback(
    debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
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
      .then(() => {})
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
    keyword,
  };

  return <AddUI {...props} />;
}
