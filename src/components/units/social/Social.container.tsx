import { gql, useQuery } from '@apollo/client';
import { useRouter } from "next/router";
import { IQuery, IQueryGetFriendListArgs } from '../../../commons/types/generated/types';
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";

const GET_FRIEND_LIST = gql`
  query getFriendList($userId: String!, $page: Float!){
    getFriendList(userId: $userId, page: $page) {
      userId
      nickname
      userActive
      userMmr
      character
      userTier
    }
  }
`

export default function Social() {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "getFriendList">,
    IQueryGetFriendListArgs
  >(GET_FRIEND_LIST, {variables: {
    userId: "b4179050-53e9-4641-9fde-bb20a2649286",
    page: 1.0}
  });

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: { page: Math.ceil((data?.getFriendList.length ?? 10) / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getFriendList === undefined) {
          return {
            getFriendList: [...prev.getFriendList],
          };
        }

        return {
          getFriendList: [...prev.getFriendList, ...fetchMoreResult.getFriendList],
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
