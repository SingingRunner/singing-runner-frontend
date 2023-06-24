import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      character
    }
  }
`;
