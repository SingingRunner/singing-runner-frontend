import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import {
  IQuery,
  IQuerySearchFriendArgs,
} from "../../../../commons/types/generated/types";
// import _ from "lodash";
import SocialSettingUI from "./SocialSetting.presenter";
import { ISocialSettingUIProps } from "./SocialSetting.types";

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

export default function SocialSetting() {
  const [userId] = useRecoilState(userIdState);
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId") || "");
  // }, []);

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "searchFriend">,
    IQuerySearchFriendArgs
  >(SEARCH_FRIEND, {
    variables: {
      userId,
      nickname: "",
      page: 1,
    },
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

  const router = useRouter();

  // 나가기 버튼 클릭 시 소셜 페이지로 이동
  const onClickExit = () => {
    router.push("/social");
  };

  const props: ISocialSettingUIProps = {
    onClickExit,
    onLoadMore,
    data,
  };

  return <SocialSettingUI {...props} />;
}
