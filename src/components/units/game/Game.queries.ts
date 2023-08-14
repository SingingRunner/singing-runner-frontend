import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUser {
    fetchUser {
      userId
      userKeynote
      character
    }
  }
`;

export const FETCH_USER_BY_USER_ID = gql`
  query FetchUserByUserId($userId: String!) {
    fetchUserByUserId(userId: $userId) {
      userId
      userKeynote
      character
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation SaveReplay($userVocal: String!, $userId: String!) {
    saveReplay(userVocal: $userVocal, userId: $userId) {
      message
      code
    }
  }
`;
