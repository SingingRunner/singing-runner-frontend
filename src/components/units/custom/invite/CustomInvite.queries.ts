import { gql } from "@apollo/client";

export const SEARCH_FRIEND = gql`
  query SearchFriend($userId: String!, $page: Int!, $nickname: String!) {
    searchFriend(userId: $userId, page: $page, nickname: $nickname) {
      userId
      character
      userTier
      nickname
      userActive
    }
  }
`;

export const INVITE_FRIEND = gql`
  mutation InviteFriend($friendId: String!, $hostUserDto: HostUserInput!) {
    inviteFriend(friendId: $friendId, hostUserDto: $hostUserDto)
  }
`;

export const FETCH_USER = gql`
  query FetchUser {
    fetchUser {
      character
      nickname
    }
  }
`;

export const FETCH_USER_BY_USER_ID = gql`
  query fetchUserByUserId($userId: String!) {
    fetchUserByUserId(userId: $userId) {
      character
      nickname
      userMmr
      userActive
      userKeynote
      userId
    }
  }
`;
