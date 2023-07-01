import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($userAuthDto: UserAuthDto!) {
    loginUser(userAuthDto: $userAuthDto) {
      accessToken
      user {
        userId
        userEmail
        nickname
        userActive
        userKeynote
        userMmr
        userPoint
        character
      }
    }
  }
`;
