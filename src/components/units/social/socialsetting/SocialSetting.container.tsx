import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
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
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "getFriendList">,
    IQueryGetFriendListArgs
  >(GET_FRIEND_LIST, {
    variables: {
      userId: "b4179050-53e9-4641-9fde-bb20a2649286",
      page: 1.0,
    },
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
