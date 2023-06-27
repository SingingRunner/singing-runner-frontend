import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IQuery,
  IQuerySearchFriendArgs,
} from "../../../commons/types/generated/types";
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";

import { SEARCH_FRIEND } from './Social.queries';


export default function Social() {
  // const [keyword, setKeyword] = useState("");

  const [userId, setUserId] = useRecoilState(userIdState);
  const [keyword, setKeyword] = useState("");
  const [debounceValue, setDebounceValue] = useState('');
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
    }, fetchPolicy: "network-only",
  });

  const onClickReplay = (friendId: string) => () => {
    try {
      console.log("replay friendId: ", friendId);
      router.push({
        pathname: `/replay/${friendId}`,
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
        const prevSearchFriend = Array.isArray(prev.searchFriend) ? prev.searchFriend : [];
        const newSearchFriend = Array.isArray(fetchMoreResult.searchFriend) ? fetchMoreResult.searchFriend : [];
  
        return {
          searchFriend: [...prevSearchFriend, ...newSearchFriend],
        };
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch({ nickname: debounceValue.trim() });
    }, 200);
  
    if (!debounceValue.trim()) {
      refetch({ nickname: "" });
    }
  
    return () => {
      clearTimeout(timer);
    };
  }, [debounceValue, refetch]);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setDebounceValue(e.target.value);
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
    keyword,
    onChangeNickname,
    onClickAdd,
    onClickExit,
    onClickReplay,
    onClickSetting,
    onLoadMore,
  };

  return <SocialUI {...props} />;
}
