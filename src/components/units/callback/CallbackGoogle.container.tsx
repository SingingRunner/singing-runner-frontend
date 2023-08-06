import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  googleUserResponseState,
  userIdState,
} from "../../../commons/store";
import { gql, useMutation } from "@apollo/client";

export const LOGIN_USER_WITH_GOOGLE = gql`
  mutation loginUserWithGoogle($googleUserResponse: GoogleUserResponseDto!) {
    loginUserWithGoogle(googleUserResponse: $googleUserResponse) {
      accessToken
      user {
        userId
      }
    }
  }
`;

export default function CallbackGoogle() {
  const router = useRouter();
  const [loginWithGoogle] = useMutation(LOGIN_USER_WITH_GOOGLE);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserId] = useRecoilState(userIdState);
  const [, setGoogleUserResponse] = useRecoilState(googleUserResponseState);

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

      // 엑세스 토큰 및 사용자 정보 가져오기
      const response = await axios.post<{
        access_token: string;
        id_token: string;
      }>("https://oauth2.googleapis.com/token", null, {
        params: {
          client_id: clientId,
          clientSecret,
          redirect_uri: `https://${window.location.host}/callback/google`, // 배포
          // redirect_uri: "http://localhost:3001/callback/google", // 로컬
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          code,
          grant_type: "authorization_code",
        },
      });
      const { data } = response;

      // 엑세스 토큰에서 사용자 ID 가져오기
      const {
        data: { sub, email }, // 변수 sub 및 email 추가
      } = await axios.get<{
        sub: string;
        email: string; // email 속성 추가
      }>("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const googleUserResponse = {
        googleId: sub, // 구글 사용자 ID
        google_account: {
          // 구글 사용자 이메일
          email,
        },
      };

      try {
        // 로그인 API 호출 및 AccessToken, UserId 전역 상태에 저장
        const result = await loginWithGoogle({
          variables: {
            googleUserResponse,
          },
        });
        const {
          accessToken,
          user: { userId },
        } = result.data.loginUserWithGoogle;

        setAccessToken(accessToken);
        setUserId(userId);

        // 로그인 성공한 경우 메인 페이지로 이동
        router.push("/main");
      } catch (error) {
        console.error("로그인 예외:", error);
        setGoogleUserResponse(googleUserResponse as any);
        router.push("/nickname");
      }
    };

    if (router.query.code) {
      handleGoogleLogin();
    }
  }, [router.query]);

  return <div>Loading...</div>;
}
