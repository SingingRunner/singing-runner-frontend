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

export const GET_NOTIFICATION = gql`
  query getNotification($userId: String!, $page: Int!) {
    getNotification(userId: $userId, page: $page) {
      senderId
      senderNickname
      receivedAt
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($addFriendDto: AddFriendDto!) {
    addFriend(addFriendDto: $addFriendDto)
  }
`;


export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notificationDto: NotificationDto!) {
    deleteNotification(notificationDto: $notificationDto)
  }
`;