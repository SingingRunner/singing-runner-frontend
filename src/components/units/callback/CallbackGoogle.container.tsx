import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  accessTokenState,
  googleUserResponseState,
  userIdState,
} from "../../../commons/store";

const LOGIN_USER_WITH_GOOGLE = gql`
  mutation LoginUserWithGoogle($googleUserResponse: GoogleUserResponseDto!) {
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
  const [loginUserWithGoogle] = useMutation(LOGIN_USER_WITH_GOOGLE);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setUserId = useSetRecoilState(userIdState);
  const setGoogleUserResponse = useSetRecoilState(googleUserResponseState);
  const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://apis.google.com/js/platform.js";
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.onload = () => initGoogleAuth();
    document.body.appendChild(scriptTag);
  }, []);

  const initGoogleAuth = () => {
    gapi.load("client:auth2", async () => {
      await gapi.auth2
        .init({
          client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        })
        .then(() => {
          const auth2 = gapi.auth2.getAuthInstance();
          const currentUser = auth2.currentUser.get();

          if (currentUser) {
            const googleUserResponse = {
              id_token: currentUser.getAuthResponse().id_token,
              email: currentUser.getBasicProfile().getEmail(),
            };

            handleGoogleLogin(googleUserResponse);
          }
        });
    });
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { data: loggedInData } = await loginUserWithGoogle({
        variables: {
          googleUserResponse: response,
        },
      });

      const accessToken = loggedInData.loginUserWithGoogle.accessToken;
      const userId = loggedInData.loginUserWithGoogle.user.userId;

      setAccessToken(accessToken);
      setUserId(userId);

      router.push("/main");
    } catch (error) {
      console.error("로그인 예외:", error); // 회원 가입 필요 (추후 수정)

      setGoogleUserResponse(response);

      router.push("/nickname"); // 닉네임 설정 페이지로 이동
    }
  };

  return <div>Loading...</div>;
}
