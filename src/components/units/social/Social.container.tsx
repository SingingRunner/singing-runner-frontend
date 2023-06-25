import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IQuery,
  IQuerySearchFriendArgs,
} from "../../../commons/types/generated/types";
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";
import _ from 'lodash'

const SEARCH_FRIEND = gql`
  query searchFriend($userId: String!, $nickname: String!, $page: Float!) {
    searchFriend(userId: $userId, nickname: $nickname, page: $page) {
      userId
      userMmr
      userTier
      nickname
      userActive
      character
    }
  }
`;

export default function Social() {
  // const [keyword, setKeyword] = useState("");

  const [userId, setUserId] = useRecoilState(userIdState);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);
  
  const { data, fetchMore, refetch } = useQuery<

    Pick<IQuery, "searchFriend">,
    IQuerySearchFriendArgs
  >(SEARCH_FRIEND, {
    variables: {
      userId,
      nickname: "",
      page: 1,
    },
  });

  const onClickReplay = (friendId: string) => () => {
    try {
      console.log("replay friendId: ", friendId);
      router.push({
        pathname: `/replay/${friendId}`
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.searchFriend.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.searchFriend === undefined) {
          return prev;
        }
        return {
          searchFriend: [...prev.searchFriend, ...fetchMoreResult.searchFriend],
        };
      },
    });
  };

  const getDebounce = useCallback(
    _.debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    getDebounce(e.target.value);
  };

  const router = useRouter();

  const onClickAdd = () => {
    router.push("/social/add");
  };

  const onClickSetting = () => {
    router.push("/social/setting");
  };

  const onClickExit = () => {
    router.push("/main");
  };

  const props: ISocialUIProps = {
    data,
    nickname,
    onChangeNickname,
    onClickAdd,
    onClickExit,
    onClickReplay,
    onClickSetting,
    onLoadMore,
  };

  return <SocialUI {...props} />;
}
