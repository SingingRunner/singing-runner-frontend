import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IQuery,
  IQueryGetFriendListArgs,
} from "../../../commons/types/generated/types";
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";

const GET_FRIEND_LIST = gql`
  query getFriendList($userId: String!, $page: Float!) {
    getFriendList(userId: $userId, page: $page) {
      userId
      nickname
      userActive
      userMmr
      character
      userTier
    }
  }
`;

export default function Social() {
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "getFriendList">,
    IQueryGetFriendListArgs
  >(GET_FRIEND_LIST, {
    variables: {
      userId,
      page: 1,
    },
  });

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.getFriendList.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getFriendList === undefined) {
          return prev;
          // {
          // getFriendList: [...prev.getFriendList],
          // };
        }
        return {
          getFriendList: [
            ...prev.getFriendList,
            ...fetchMoreResult.getFriendList,
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

  // 리플레이 버튼 클릭 시 리플레이 페이지로 이동
  const onClickReplay = () => {
    router.push("/social/replay");
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
