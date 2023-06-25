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
