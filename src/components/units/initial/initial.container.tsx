import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import InitialUI from "./initial.presenter";
import { IInitialUIProps } from "./initial.types";

export default function Initial() {
  const router = useRouter();
  const [hostUrl, setHostUrl] = useState("");

  useEffect(() => {
    setHostUrl(window.location.host);
  });

  const handleKakaoLogin = () => {
    const kakaoRedirectUri = encodeURIComponent(
      // `http://localhost:3001/callback/kakao` // 로컬용
      `https://${window.location.host}/callback/kakao` // 배포용
    );
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY || "";

    const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
    window.location.href = kakaoOauthURL;
  };

  const handleGoogleLogin = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const googleRedirectUrl = `https://${hostUrl}/callback/google`;
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`;

    window.location.href = googleAuthURL;
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const props: IInitialUIProps = {
    handleSignUpClick,
    handleLoginClick,
    handleKakaoLogin,
    handleGoogleLogin,
  };

  return <InitialUI {...props} />;
}
