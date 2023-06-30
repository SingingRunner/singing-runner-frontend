import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import CustomInviteUI from "./CustomInvite.presenter";
import {
  INVITE_FRIEND,
  SEARCH_FRIEND,
  FETCH_USER,
} from "./CustomInvite.queries";
import { useRecoilState } from "recoil";
import {
  globalModalState,
  roomInfoState,
  userIdState,
} from "../../../../commons/store";
import { ChangeEvent, useCallback, useState } from "react";
import {
  IQuery,
  IQueryFetchUserArgs,
  IQuerySearchFriendArgs,
} from "../../../../commons/types/generated/types";
import debounce from "lodash/debounce";
import { useCustomRoomInfo } from "../../../../commons/hooks/useCustomRoomInfo";

export default function CustomInvite() {
  const [userId] = useRecoilState(userIdState);
  const [roomInfo] = useRecoilState(roomInfoState);
  const [keyword, setKeyword] = useState("");
  const [isLimitCountModalOpen, setIsLimitCountModalOpen] = useState(false);
  const [, setGlobalModal] = useRecoilState(globalModalState);

  const { data: userData } = useQuery<
    Pick<IQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_USER, { variables: { userId } });

  const { loading, data, refetch, fetchMore } = useQuery<
    Pick<IQuery, "searchFriend">,
    IQuerySearchFriendArgs
  >(SEARCH_FRIEND, {
    variables: {
      userId,
      page: 1,
      nickname: "",
    },
    fetchPolicy: "network-only",
  });

  // 친구 초대 시 fetch 후 초대 완료 모달 생성
  const [fetchFriend] = useLazyQuery<
    Pick<IQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_USER, {
    onCompleted: (friendData) => {
      setGlobalModal((prev) => ({
        ...prev,
        isOpen: true,
        isCheck: true,
        hilightText: friendData?.fetchUser.nickname,
        firstText: "님에게",
        secondText: "초대를 보냈어요!",
        buttonText: "확인",
      }));
    },
  });

  useCustomRoomInfo();

  const [inviteFriend] = useMutation(INVITE_FRIEND);

  const getDebounce = useCallback(
    debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    getDebounce(e.target.value);
  };

  const onClickInvite = (friendId: string) => {
    if (!userData?.fetchUser.nickname) return;
    if (roomInfo.players.length >= 3) {
      setIsLimitCountModalOpen(true);
      return;
    }
    inviteFriend({
      variables: {
        friendId,
        hostUserDto: { userId, nickname: userData.fetchUser.nickname },
      },
    });
    fetchFriend({ variables: { userId: friendId } });
  };

  const onLoadMore = () => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.searchFriend.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.searchFriend === undefined)
          return { searchFriend: [...prev.searchFriend] };
        return {
          searchFriend: [
            ...prev.searchFriend,
            ...fetchMoreResult?.searchFriend,
          ],
        };
      },
    });
  };

  return (
    <CustomInviteUI
      data={data}
      loading={loading}
      keyword={keyword}
      isLimitCountModalOpen={isLimitCountModalOpen}
      onChangeKeyword={onChangeKeyword}
      onLoadMore={onLoadMore}
      onClickInvite={onClickInvite}
      setIsLimitCountModalOpen={setIsLimitCountModalOpen}
    />
  );
}
