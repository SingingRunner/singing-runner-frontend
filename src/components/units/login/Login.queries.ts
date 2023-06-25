import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($userLoginDto: UserLoginDto!) {
    loginUser(userLoginDto: $userLoginDto) {
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
