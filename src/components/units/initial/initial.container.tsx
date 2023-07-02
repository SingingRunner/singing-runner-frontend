import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { accessTokenState, userIdState } from '../../../commons/store';
import InitialUI from "./initial.presenter";
import { IInitialUIProps } from "./initial.types";

export default function Initial() {
  const [authURL, setAuthURL] = useState<string>("");
  const [token] = useRecoilState(accessTokenState);
  const [userId] = useRecoilState(userIdState);


  useEffect(() => {
    const REDIRECT_URI = encodeURIComponent("https://injungle.shop/callback/kakao"); // 배포용
    // const REDIRECT_URI = encodeURIComponent("http://localhost:3001/callback/kakao"); // 로컬용
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY || "";
    const AUTH_ENDPOINT = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    setAuthURL(AUTH_ENDPOINT);

    console.log("액세스토큰 상태: ", token)
    console.log("유저ID: ", userId)
  }, []);

  // 카카오 로그인 버튼 클릭 시 실행되는 함수
  const handleKakaoLogin = async () => {
    window.location.href = authURL;
  };
  

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const router = useRouter();

  const props: IInitialUIProps = {
    handleSignUpClick,
    handleLoginClick,
    handleKakaoLogin,
  };

  return <InitialUI {...props} />;
}
