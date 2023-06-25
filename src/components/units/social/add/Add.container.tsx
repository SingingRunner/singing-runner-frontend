import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import {
  IQuery,
  IQuerySearchUserArgs,
} from "../../../../commons/types/generated/types";
// import _ from "lodash";
import _ from 'lodash'
import AddUI from './Add.presenter';
import { IAddUIProps } from './Add.types';

const SEARCH_USER = gql`
  query searchUser($nickname: String!, $page: Float!) {
    searchUser(nickname: $nickname, page: $page) {
      userId
      userMmr
      userTier
      nickname
      userActive
      character
    }
  }
`;

const FRIEND_REQUEST = gql`
  mutation friendRequest($notificationDto: NotificationDto!) {
    friendRequest(notificationDto: $notificationDto)
  }
`;

const ADD_FRIEND = gql`
  mutation addFriend($addFriendDto: AddFriendDto!) {
    addFriend(addFriendDto: $addFriendDto)
  }
`;

export default function Add() {
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userIdState);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "searchUser">,
    IQuerySearchUserArgs
  >(SEARCH_USER, {
    variables: {
      nickname: "",
      page: 1,
    },
    fetchPolicy: 'network-only',
  });

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.searchUser.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.searchUser === undefined) {
          return prev;
        }
        return {
          searchUser: [...prev.searchUser, ...fetchMoreResult.searchUser],
        };
      },
    });
  };
  const [friendRequest] = useMutation(FRIEND_REQUEST);

  const getDebounce = useCallback(
    _.debounce((data) => {
      refetch({ nickname: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    getDebounce(e.target.value);
  };

  const handleAddRequest = (receiverId: string) => () => {
      friendRequest({
        variables: {
          notificationDto: {
            userId: receiverId,
            senderId: userId,
          }
        }
      })
      .then(response => {
        console.log('Add friend request sent:', response);
        console.log("receiverId:", receiverId);
        console.log("senderId:", userId);
      })
      .catch(error => {
        console.error('Error sending add friend request:', error);
      });
  };

  // 나가기 버튼 클릭 시 소셜 페이지로 이동
  const onClickExit = () => {
    router.push("/social");
  };

  const props: IAddUIProps = {
    data,
    handleAddRequest,
    nickname,
    onChangeNickname,
    onClickExit,
    onLoadMore,
  };

  return <AddUI {...props} />;
}
