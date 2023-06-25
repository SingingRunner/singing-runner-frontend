import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
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
