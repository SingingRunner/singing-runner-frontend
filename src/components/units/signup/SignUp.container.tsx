import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ISignUpUIProps } from "./SignUp.types";
import SignUpUI from "./SignUp.presenter";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
    useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  // 가입 완료 버튼 활성화 여부를 상태로 관리
  const [isSignUpButtonEnabled, setSignUpButtonEnabled] = useState(false);
  const [isLoginFinishButtonEnabled, setLoginFinishButtonEnabled] =
    useState(false);

  useEffect(() => {
    // 유효성 검사와 중복 확인 상태에 따라 가입 완료 버튼 활성화 여부를 업데이트합니다.
    if (
      emailErrorMessage === "" &&
      passwordErrorMessage === "" &&
      passwordCheckErrorMessage === "" &&
      nicknameErrorMessage === "" &&
      email !== "" &&
      password !== "" &&
      passwordCheck !== "" &&
      nickname !== ""
    ) {
      setSignUpButtonEnabled(true);
    } else {
      setSignUpButtonEnabled(false);
    }
  }, [
    emailErrorMessage,
    passwordErrorMessage,
    passwordCheckErrorMessage,
    nicknameErrorMessage,
    email,
    password,
    passwordCheck,
    nickname,
  ]);

  const handleLoginFinishClick = () => {
    setLoginFinishButtonEnabled(true);
  };

  const handleNicknameChange = (e) => {
    const enteredNickname = e.target.value;
    setNickname(enteredNickname);
    validateNickname(enteredNickname);
  };

  const validateNickname = (enteredNickname) => {
    const koreanContainsOnlyConsonantsRegex = /[ㄱ-ㅎ]+/;
    const koreanContainsOnlyVowelsRegex = /[ㅏ-ㅣ]+/;
    const specialCharactersRegex = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/;
    const whitespaceRegex = /\s+/;

    if (enteredNickname === "") {
      setNicknameErrorMessage("");
    } else if (specialCharactersRegex.test(enteredNickname)) {
      setNicknameErrorMessage(
        "* 닉네임에는 한글, 영어, 숫자만 입력 가능합니다."
      );
    } else if (
      koreanContainsOnlyConsonantsRegex.test(enteredNickname) ||
      koreanContainsOnlyVowelsRegex.test(enteredNickname)
    ) {
      setNicknameErrorMessage(
        "* 닉네임에 한글 모음, 자음만 사용하실 수는 없습니다."
      );
    } else if (whitespaceRegex.test(enteredNickname)) {
      setNicknameErrorMessage("* 닉네임에 띄어쓰기를 사용할 수 없습니다.");
    } else if (enteredNickname.length < 2 || enteredNickname.length > 6) {
      setNicknameErrorMessage("* 닉네임은 2~6자로 입력해주세요.");
    } else {
      setNicknameErrorMessage("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage("");
    // validateEmail();
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    if (email === "") {
      setEmailErrorMessage("");
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage("* 올바른 이메일 형식으로 입력해주세요.");
    }
  };

  const checkDuplicateEmail = () => {
    console.log("이메일 중복 확인 버튼 눌림");
    // 중복 확인 로직 추가
    // if (isEmailInUse(email)) {
    //   setEmailError('이미 사용 중인 이메일입니다.');
    // }
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
    validatePasswordMatch(enteredPassword, passwordCheck);
  };

  const handlePasswordCheckChange = (e) => {
    const enteredPasswordCheck = e.target.value;
    setPasswordCheck(enteredPasswordCheck);
    validatePasswordMatch(password, enteredPasswordCheck);
  };

  const validatePasswordMatch = (enteredPassword, enteredPasswordCheck) => {
    if (enteredPasswordCheck === "" || enteredPassword === "") {
      // 둘 중에 하나 입력 안됐을 때는 에러메시지 안띄우기.
      setPasswordCheckErrorMessage("");
    } else if (enteredPasswordCheck !== enteredPassword) {
      setPasswordCheckErrorMessage("* 비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordCheckErrorMessage("");
    }
  };

  const dummyClick = () => {
    console.log("dummy");
  };

  const router = useRouter();

  const handleSignUpFinishClick = () => {
    // 메인 화면으로 전환
    router.push("/signup/starting");
  };

  const props: ISignUpUIProps = {
    handleSignUpFinishClick,
    email,
    password,
    passwordCheck,
    nickname,
    handleEmailChange,
    emailErrorMessage,
    handlePasswordChange,
    passwordErrorMessage,
    handlePasswordCheckChange,
    passwordCheckErrorMessage,
    handleNicknameChange,
    nicknameErrorMessage,
    validateEmail,
    checkDuplicateEmail,
    isSignUpButtonEnabled,
    dummyClick,
    handleLoginFinishClick,
    isLoginFinishButtonEnabled,
  };

  return <SignUpUI {...props} />;
}
