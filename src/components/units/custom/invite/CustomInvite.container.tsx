import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import CustomInviteUI from "./CustomInvite.presenter";
import {
  INVITE_FRIEND,
  SEARCH_FRIEND,
  FETCH_USER,
  FETCH_FRIEND,
} from "./CustomInvite.queries";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import {
  IQuery,
  IQueryFetchUserArgs,
  IQuerySearchFriendArgs,
} from "../../../../commons/types/generated/types";
import _ from "lodash";
import { SocketContext } from "../../../../commons/contexts/SocketContext";

export default function CustomInvite() {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [userId] = useRecoilState(userIdState);
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId") || "");
  // }, []);

  const { data: userData } = useQuery<
    Pick<IQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_USER, { variables: { userId } });

  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "searchFriend">,
    IQuerySearchFriendArgs
  >(SEARCH_FRIEND, {
    variables: {
      userId,
      page: 1,
      nickname: "",
    },
  });

  const getDebounce = useCallback(
    _.debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    getDebounce(e.target.value);
  };

  const [inviteFriend] = useMutation(INVITE_FRIEND);

  const [fetchFriend] = useLazyQuery<
    Pick<IQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_FRIEND, {
    // 초대하기 클릭 시 fetchFriend 쿼리 실행 후 작동하는 함수
    onCompleted: (friendData) => {
      const inviteArgs = {
        userMathDto: {
          userId: friendData.fetchUser.userId,
          userMmr: friendData.fetchUser.userMmr,
          nickname: friendData.fetchUser.nickname,
          userActive: friendData.fetchUser.userActive,
          userKeynote: friendData.fetchUser.userKeynote,
          character: friendData.fetchUser.character,
        },
        HostUserDto: {
          userId,
          nickname: userData?.fetchUser.nickname,
        },
      };
      socket?.emit("invite", inviteArgs);
    },
  });

  const onClickInvite = (friendId: string) => {
    if (!userData?.fetchUser.nickname) return;
    inviteFriend({
      variables: {
        friendId,
        hostUserDto: { userId, nickname: userData.fetchUser.nickname },
      },
    });
    fetchFriend({ variables: { userId: friendId } });
  };

  return (
    <CustomInviteUI
      onClickInvite={onClickInvite}
      data={data}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    />
  );
}
