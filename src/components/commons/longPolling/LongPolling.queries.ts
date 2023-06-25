import { gql } from "@apollo/client";

export const LONG_POLLING_MUTATION = gql`
  mutation LongPolling($userId: String!) {
    longPolling(userId: $userId) {
      hostUserDtoList {
        nickname
        userId
      }
      userNotificationList {
        sender {
          nickname
          userId
        }
      }
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
