import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  kakaoUserResponseState,
  userIdState,
} from "../../../commons/store";

const LOGIN_WITH_KAKAO = gql`
  mutation LoginWithKakao($kakaoUserResponse: KakaoUserResponseDto!) {
    loginUserWithKakao(kakaoUserResponse: $kakaoUserResponse) {
      accessToken
      user {
        userId
      }
    }
  }
`;

export default function CallbackKakao() {
  const router = useRouter();
  const [loginWithKakao] = useMutation(LOGIN_WITH_KAKAO);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserId] = useRecoilState(userIdState);
  const [, setKakaoUserResponse] = useRecoilState(kakaoUserResponseState);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      // authURL 로 부터 인증 코드(code) 가져오기
      const code = new URLSearchParams(window.location.search).get("code");
      const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

      // 인증 코드를 이용하여 엑세스 토큰(accessToken) 받아오기
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: kakaoApiKey,
            redirect_uri: `https://${window.location.host}/callback/kakao`, // 배포용
            // redirect_uri: "http://localhost:3001/callback/kakao", // 로컬용
            code,
          },
        }
      );
      const accessToken: string = response.data.access_token;

      // 엑세스 토큰을 이용하여 사용자 정보 받아오기
      const { data } = await axios.get<{
        id: string;
        kakao_account: { email: string };
      }>("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const kakaoUserResponse = {
        id: data.id.toString(),
        kakao_account: {
          email: data.kakao_account.email,
        },
      };

      try {
        const { data: loggedInData } = await loginWithKakao({
          variables: {
            kakaoUserResponse,
          },
        });

        // 로그인 성공한 경우 메인 페이지로 이동
        const accessToken = loggedInData.loginUserWithKakao.accessToken;
        const userId = loggedInData.loginUserWithKakao.user.userId; // 이 부분을 추가하세요

        setAccessToken(accessToken); // Recoil에 엑세스 토큰 저장
        setUserId(userId); // Recoil에 userId 저장

        router.push("/main");
      } catch (error) {
        console.error("로그인 예외:", error); // 에러 로그 출력
        // 로그인 실패한 경우 - 새로운 회원으로 판단
        setKakaoUserResponse(kakaoUserResponse as any);
        router.push("/nickname"); // 닉네임 설정 페이지로 이동
      }
    };

    handleKakaoLogin();
  }, []);

  return <div>Loading...</div>;
}
