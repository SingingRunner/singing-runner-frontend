import { useRouter } from "next/router";
import InitialUI from "./initial.presenter";
import { IInitialUIProps } from "./initial.types";

export default function Initial() {
  const router = useRouter();

  const createAuthEndpoint = (provider: string) => {
    const redirectUri = encodeURIComponent(
      // `http://localhost:3001/callback/${provider}` // 로컬용
      `https://injungle.shop/callback/${provider}` // 배포용
    );
    const apiKey =
      provider === "kakao"
        ? process.env.NEXT_PUBLIC_KAKAO_API_KEY || ""
        : process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
    console.log("API Key:", apiKey); // 추가된 디버깅 로그

    if (provider === "kakao") {
      return `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;
    }

    if (provider === "google") {
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    }

    return "";
  };

  const handleOAuthLogin = (provider: string) => {
    const oauthURL = createAuthEndpoint(provider);
    console.log("oauthURL:", oauthURL); // 임시 디버깅용
    console.log("Kakao API Key:", process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    console.log("GOOGLE API Key:", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
    window.location.href = oauthURL;
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
    handleKakaoLogin: () => handleOAuthLogin("kakao"),
    handleGoogleLogin: () => handleOAuthLogin("google"),
  };

  return <InitialUI {...props} />;
}
