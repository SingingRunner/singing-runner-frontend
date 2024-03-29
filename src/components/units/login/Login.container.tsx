import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState, userIdState } from "../../../commons/store";
import LoginUI from "./Login.presenter";
import { ILoginUIProps } from "./Login.types";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../commons/types/generated/types";
import { LOGIN_USER } from "./Login.queries";
import { S3_PATH } from "../../../commons/constants/Constants";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);
  const [isLoginButtonEnabled, setLoginButtonEnabled] = useState(false);

  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    // 유효성 검사 결과 => 가입 완료 버튼 활성화 여부 업데이트.
    if (
      emailError === "" &&
      passwordError === "" &&
      email !== "" &&
      password !== ""
    ) {
      setLoginButtonEnabled(true);
    } else {
      setLoginButtonEnabled(false);
    }
  }, [emailError, passwordError, email, password]);

  const onClickLogin = async (): Promise<void> => {
    try {
      // 1. 로그인 뮤테이션으로 accessToken 받아오기
      const result = await loginUser({
        variables: {
          userAuthDto: {
            userEmail: email,
            password,
          },
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      const loginUserInfo = result.data?.loginUser.user; // 로그인 유저 정보

      if (accessToken === undefined) {
        return;
      }

      // 2-2. accessToken을 global state에 저장
      setAccessToken(accessToken);
      setUserId(loginUserInfo?.userId || "");

      // 3. 로그인 성공 후 메인 페이지로 이동
      router.push("/main");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(`${S3_PATH}/sound/effect/disabled_button.mp3`);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isLoginButtonEnabled) {
        audioRef.current?.play();
        onClickLogin();
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사 BASIC 정규식
    if (email === "") {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("* 올바른 이메일 형식으로 입력해주세요.");
    }
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (enteredPassword === "") {
      setPasswordError("");
    } else if (enteredPassword.length < 6 || enteredPassword.length > 12) {
      setPasswordError("* 비밀번호는 6~12자로 입력해주세요.");
    } else if (!passwordRegex.test(enteredPassword)) {
      setPasswordError(
        "* 영문자, 숫자, 특수문자를 최소 하나씩 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }

    setPassword(enteredPassword);
  };

  const dummyClick = () => {};

  const props: ILoginUIProps = {
    email,
    password,
    handleEmailChange,
    emailError,
    handlePasswordChange,
    passwordError,
    validateEmail,
    dummyClick,
    onClickLogin,
    isLoginButtonEnabled,
    onKeyDown,
  };

  return <LoginUI {...props} />;
}
