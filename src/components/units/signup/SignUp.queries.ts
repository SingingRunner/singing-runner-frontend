import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($newUser: UserRegisterDto!) {
    registerUser(newUser: $newUser) {
      accessToken
      user {
        userId
        character
      }
    }
  }
`;