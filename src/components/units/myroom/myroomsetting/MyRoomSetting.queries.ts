import { gql } from '@apollo/client';

export const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      userId
      userEmail
      nickname
      userActive
      userKeynote
      userMmr
      userPoint
      character
      userTier
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout($userId: String!) {
    logout(userId: $userId)
  }
`;

export const UPDATE_USER_KEYNOTE = gql`
  mutation UpdateUserKeynote($userId: String!, $keynote: userKeynoteStatus!) {
    updateUserKeynote(userId: $userId, keynote: $keynote) {
      userId
      userKeynote
    }
  }
`;