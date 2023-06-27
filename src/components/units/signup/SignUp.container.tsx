import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ISignUpUIProps } from "./SignUp.types";
import SignUpUI from "./SignUp.presenter";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationRegisterUserArgs,
} from "../../../commons/types/generated/types";

import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IS_EMAIL_TAKEN,
  IS_NICKNAME_TAKEN,
  REGISTER_USER,
} from "./SignUp.queries";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  // 가입 완료 버튼 활성화 여부를 상태로 관리
  const [isSignUpButtonEnabled, setSignUpButtonEnabled] = useState(false);
  const [registerUser] = useMutation<
    Pick<IMutation, "registerUser">,
    IMutationRegisterUserArgs
  >(REGISTER_USER);

  const [, setUserId] = useRecoilState(userIdState);
  const [emailCheck, { data: emailCheckData }] = useLazyQuery(IS_EMAIL_TAKEN, {
    fetchPolicy: "network-only",
  });
  const [nicknameCheck, { data: nicknameCheckData }] = useLazyQuery(
    IS_NICKNAME_TAKEN,
    {
      fetchPolicy: "network-only",
    }
  );
  const [emailVerified, setEmailVerified] = useState(false);
  const [nicknameVerified, setNicknameVerified] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  // 이메일과 닉네임 중복확인 버튼이 각각 눌릴 때 useEffect에서 간섭이 안되게 관리하는 플래그
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);

  const onClickSignUp = async (): Promise<void> => {
    // 메인 화면으로 전환
    try {
      const newUser = {
        userEmail: email,
        password,
        nickname,
      };

      const { data } = await registerUser({ variables: { newUser } });
      const registeredUser = data?.registerUser.user;

      // 회원가입 성공 시 로컬 스토리지에 userId 저장
      localStorage.setItem("userId", registeredUser?.userId || "");
      setUserId(registeredUser?.userId || "");

      console.log("registeredUser: ", registeredUser);

      router.push("/signup/starting");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    // 유효성 검사와 중복 확인 상태에 따라 가입 완료 버튼 활성화 여부를 업데이트합니다.
    if (
      emailError === "" &&
      passwordError === "" &&
      passwordCheckError === "" &&
      nicknameError === "" &&
      email !== "" &&
      password !== "" &&
      passwordCheck !== "" &&
      nickname !== "" &&
      emailVerified &&
      nicknameVerified
    ) {
      setSignUpButtonEnabled(true);
    } else {
      setSignUpButtonEnabled(false);
    }
  }, [
    emailError,
    passwordError,
    passwordCheckError,
    nicknameError,
    email,
    password,
    passwordCheck,
    nickname,
    emailVerified,
    nicknameVerified,
  ]);

  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setEmailMessage("");
    setCheckEmail(false);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError("");
    setNicknameMessage("");
    setCheckNickname(false);
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (enteredPassword === "") {
      setPasswordError(" ");
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
    validatePasswordMatch(enteredPassword, passwordCheck);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    if (email === "") {
      setEmailError(" ");
    } else if (!emailRegex.test(email)) {
      setEmailError("* 올바른 이메일 형식으로 입력해주세요.");
    }
  };
  
  const validateNickname = () => {
    const koreanContainsOnlyConsonantsRegex = /[ㄱ-ㅎ]+/;
    const koreanContainsOnlyVowelsRegex = /[ㅏ-ㅣ]+/;
    const specialCharactersRegex = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/;
    const whitespaceRegex = /\s+/;

    if (nickname === "") {
      setNicknameError(" ");
    } else if (specialCharactersRegex.test(nickname)) {
      setNicknameError("* 닉네임에는 한글, 영어, 숫자만 입력 가능합니다.");
    } else if (
      koreanContainsOnlyConsonantsRegex.test(nickname) ||
      koreanContainsOnlyVowelsRegex.test(nickname)
    ) {
      setNicknameError("* 닉네임에 한글 모음, 자음만 사용하실 수는 없습니다.");
    } else if (whitespaceRegex.test(nickname)) {
      setNicknameError("* 닉네임에 띄어쓰기를 사용할 수 없습니다.");
    } else if (nickname.length < 2 || nickname.length > 6) {
      setNicknameError("* 닉네임은 2~6자로 입력해주세요.");
    } else {
      setNicknameError("");
    }
  };

  const checkDuplicateEmail = async () => {
    console.log("이메일 중복 확인 버튼 눌림");
    emailCheck({ variables: { userEmail: email } });
    setEmailVerified(false);
    setCheckEmail(true);
  };

  const checkDuplicateNickname = async () => {
    console.log("닉네임 중복 확인 버튼 눌림");
    nicknameCheck({ variables: { nickname } });
    setNicknameVerified(false);
    setCheckNickname(true);
  };

  useEffect(() => {
    const emailIsTaken = emailCheckData?.isEmailTaken;
    const nicknameIsTaken = nicknameCheckData?.isNicknameTaken;

    if (checkEmail && emailIsTaken === true) {
      setEmailError("* 이메일이 이미 사용 중입니다.");
      setEmailMessage("");
    } else if (checkEmail && emailIsTaken === false) {
      setEmailVerified(true);
      setEmailMessage("사용 가능한 이메일입니다.");
    }

    if (checkNickname && nicknameIsTaken === true) {
      setNicknameError("* 닉네임이 이미 사용 중입니다.");
      setNicknameMessage("");
    } else if (checkNickname && nicknameIsTaken === false) {
      setNicknameVerified(true);
      setNicknameMessage("사용 가능한 닉네임입니다.");
    }
  }, [emailCheckData, nicknameCheckData]);

  const handlePasswordCheckChange = (e) => {
    const enteredPasswordCheck = e.target.value;
    setPasswordCheck(enteredPasswordCheck);
    validatePasswordMatch(password, enteredPasswordCheck);
  };

  const validatePasswordMatch = (enteredPassword, enteredPasswordCheck) => {
    if (enteredPasswordCheck === "" || enteredPassword === "") {
      // 둘 중에 하나 입력 안됐을 때는 에러메시지 안띄우기.
      setPasswordCheckError("");
    } else if (enteredPasswordCheck !== enteredPassword) {
      setPasswordCheckError("* 비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordCheckError("");
    }
  };

  const dummyClick = () => {
    console.log("dummy");
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isSignUpButtonEnabled) {
        onClickSignUp();
      }
    }
  };

  const router = useRouter();

  const props: ISignUpUIProps = {
    onClickSignUp,
    email,
    password,
    passwordCheck,
    nickname,
    handleEmailChange,
    emailError,
    handlePasswordChange,
    passwordError,
    handlePasswordCheckChange,
    passwordCheckError,
    handleNicknameChange,
    nicknameError,
    validateEmail,
    checkDuplicateEmail,
    isSignUpButtonEnabled,
    dummyClick,
    onKeyDown,
    checkDuplicateNickname,
    emailMessage,
    nicknameMessage,
    validateNickname,
  };

  return <SignUpUI {...props} />;
}
