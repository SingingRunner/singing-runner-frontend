import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUser {
    fetchUser {
      character
      nickname
      userTier
    }
  }
`;
