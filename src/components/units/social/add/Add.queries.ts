import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query searchUser($userId: String!, $nickname: String!, $page: Int!) {
    searchUser(userId: $userId, nickname: $nickname, page: $page) {
      userId
      userMmr
      userTier
      nickname
      userActive
      character
    }
  }
`;

export const FRIEND_REQUEST = gql`
  mutation friendRequest($notificationDto: NotificationDto!) {
    friendRequest(notificationDto: $notificationDto)
  }
`;