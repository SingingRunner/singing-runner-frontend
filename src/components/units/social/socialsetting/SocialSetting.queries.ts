import { gql } from '@apollo/client';

export const SEARCH_FRIEND = gql`
  query searchFriend($userId: String!, $nickname: String!, $page: Int!) {
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

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($addFriendDto: AddFriendDto!) {
    removeFriend(addFriendDto: $addFriendDto)
  }
`;