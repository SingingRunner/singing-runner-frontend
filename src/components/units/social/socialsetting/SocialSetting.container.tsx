import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userIdState } from '../../../../commons/store';
import {
  IQuery,
  IQueryGetFriendListArgs,
} from "../../../../commons/types/generated/types";
import SocialSettingUI from "./SocialSetting.presenter";
import { ISocialSettingUIProps } from "./SocialSetting.types";

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

export default function SocialSetting() {
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "getFriendList">,
    IQueryGetFriendListArgs
  >(GET_FRIEND_LIST, {variables: {
    userId,
    page: 1}
  });

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.getFriendList.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getFriendList === undefined) {
          return {
            getFriendList: [...prev.getFriendList],
          };
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

  // 나가기 버튼 클릭 시 소셜 화면으로 이동
  const onClickExit = () => {
    router.push("/social");
  };

  const router = useRouter();

  const props: ISocialSettingUIProps = {
    onClickExit,
    onLoadMore,
    data,
  };

  return <SocialSettingUI {...props} />;
}
