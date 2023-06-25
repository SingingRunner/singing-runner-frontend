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
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      character
      nickname
    }
  }
`;

export const FETCH_FRIEND = gql`
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      character
      nickname
      userMmr
      userActive
      userKeynote
      userId
    }
  }
`;
