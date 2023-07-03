import { useRouter } from "next/router";
import InitialUI from "./initial.presenter";
import { IInitialUIProps } from "./initial.types";

export default function Initial() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const kakaoRedirectUri = encodeURIComponent(
      // `http://localhost:3001/callback/kakao` // 로컬용
      `https://injungle.shop/callback/kakao` // 배포용
    );
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY || "";

    const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
    window.location.href = kakaoOauthURL;
  };

  const handleGoogleLogin = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const googleRedirectUrl = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || "";
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`;
    
    console.log('NEXT_PUBLIC_GOOGLE_REDIRECT_URL:', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL);
    console.log('Redirect URL:', googleRedirectUrl);
    console.log('Complete Google Auth URL:', googleAuthURL);

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
