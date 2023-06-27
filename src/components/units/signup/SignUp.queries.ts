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

// 중복 있으면 true, 없으면 false

// 이메일 중복 확인
export const IS_EMAIL_TAKEN = gql`
  query IsEmailTaken($userEmail: String!) {
    isEmailTaken(userEmail: $userEmail)
  }
`;

// 닉네임 중복 확인
export const IS_NICKNAME_TAKEN = gql`
  query IsNicknameTaken($nickname: String!) {
    isNicknameTaken(nickname: $nickname)
  }
`;