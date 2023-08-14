import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUser {
    fetchUser {
      userId
      character
      nickname
      userTier
    }
  }
`;
