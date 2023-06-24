import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IQuery,
  IQuerySearchFriendArgs,
} from "../../../commons/types/generated/types";
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";
// import _ from 'lodash'

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
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);
  
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

  const onClickReplay = () => {
    router.push({
      pathname: `/social/replay/${userId}` // 현재 유저 => 다른 유저로 수정 필요
    });
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
          // {
          // getFriendList: [...prev.getFriendList],
          // };
        }
        return {
          searchFriend: [
            ...prev.searchFriend,
            ...fetchMoreResult.searchFriend,
          ],
        };
      },
    });
  };

  const router = useRouter();

  // 설정 버튼 클릭 시 설정 페이지로 이동
  const onClickSetting = () => {
    router.push("/social/setting");
  };

  // 나가기 버튼 클릭 시 이전 페이지로 이동
  const onClickExit = () => {
    router.push("/main");
  };

  const props: ISocialUIProps = {
    onClickSetting,
    onClickReplay,
    onClickExit,
    onLoadMore,
    data,
  };

  return <SocialUI {...props} />;
}
