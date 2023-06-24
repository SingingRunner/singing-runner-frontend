import { gql } from "@apollo/client";

export const FRIEND_REQUEST = gql`
  mutation FriendRequest($notificationDto: NotificationDto!) {
    friendRequest(notificationDto: $notificationDto)
  }
`;
