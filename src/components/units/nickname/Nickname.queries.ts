import { gql } from '@apollo/client';

export const REGISTER_USER_WITH_KAKAO = gql`
  mutation RegisterUserWithKakao(
    $kakaoUserResponse: KakaoUserResponseDto!
    $nickname: String!
  ) {
    registerUserWithKakao(
      kakaoUserResponse: $kakaoUserResponse
      nickname: $nickname
    ) {
      accessToken
      user {
        userId
        character
      }
    }
  }
`;

// 중복이면 true, 아니면 false

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