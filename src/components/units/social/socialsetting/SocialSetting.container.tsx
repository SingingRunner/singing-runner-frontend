import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import {
  IQuery,
  IQuerySearchFriendArgs,
} from "../../../../commons/types/generated/types";
import SocialSettingUI from "./SocialSetting.presenter";
import { ISocialSettingUIProps } from "./SocialSetting.types";

import _ from 'lodash'
import { REMOVE_FRIEND, SEARCH_FRIEND } from './SocialSetting.queries';


export default function SocialSetting() {
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userIdState);
  const [keyword, setKeyword] = useState("");
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
    fetchPolicy: "network-only",
  });

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
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const getDebounce = useCallback(
    _.debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    getDebounce(e.target.value);
  };

  const onClickDelete = (friendId: string) => () => {
    try {
      console.log("delete friendId: ", friendId);
      console.log("delete userId: ", userId);
      removeFriend({
        variables: {
          addFriendDto: {
            userId,
            friendId,
          },
        },
      });
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  // 나가기 버튼 클릭 시 소셜 페이지로 이동
  const onClickExit = () => {
    router.push("/social");
  };

  const props: ISocialSettingUIProps = {
    onClickExit,
    onLoadMore,
    data,
    onClickDelete,
    keyword,
    onChangeNickname,
  };

  return <SocialSettingUI {...props} />;
}
