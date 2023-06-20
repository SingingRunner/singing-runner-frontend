import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginUI from './Login.presenter';
import { ILoginUIProps } from './Login.types';

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoginButtonEnabled, setLoginButtonEnabled] =
    useState(false);

  useEffect(() => {
    // 유효성 검사 결과 => 가입 완료 버튼 활성화 여부 업데이트.
    if (
      emailErrorMessage === "" &&
      passwordErrorMessage === "" &&
      email !== "" &&
      password !== ""
    ) {
      setLoginButtonEnabled(true);
    } else {
      setLoginButtonEnabled(false);
    }
  }, [
    emailErrorMessage,
    passwordErrorMessage,
    email,
    password,
  ]);
  
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/main");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage("");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사 BASIC 정규식
    if (email === "") {
      setEmailErrorMessage("");
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage(
        "* 올바른 이메일 형식으로 입력해주세요."
      );
    }
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (enteredPassword === "") {
      setPasswordErrorMessage("");
    } else if (enteredPassword.length < 6 || enteredPassword.length > 12) {
      setPasswordErrorMessage("* 비밀번호는 6~12자로 입력해주세요.");
    } else if (!passwordRegex.test(enteredPassword)) {
      setPasswordErrorMessage(
        "* 영문자, 숫자, 특수문자를 최소 하나씩 포함해야 합니다."
      );
    } else {
      setPasswordErrorMessage("");
    }

    setPassword(enteredPassword);
  };

  const dummyClick = () => {
    console.log("dummy");
  };


  // const handleChangeAddress = () => {
  //   // 메인 화면으로 전환
  //   router.push("/main");
  // };

  const props: ILoginUIProps = {
    email,
    password,
    handleEmailChange,
    emailErrorMessage,
    handlePasswordChange,
    passwordErrorMessage,
    validateEmail,
    dummyClick,
    handleLoginClick,
    isLoginButtonEnabled,
  };

  return <LoginUI {...props} />;
}
