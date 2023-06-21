import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ISignUpUIProps } from "./SignUp.types";
import SignUpUI from "./SignUp.presenter";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationRegisterUserArgs,
} from "../../../commons/types/generated/types";
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../../commons/store';

const REGISTER_USER = gql`
  mutation RegisterUser($newUser: UserRegisterDto!) {
    registerUser(newUser: $newUser) {
      userId
      userEmail
      nickname
      userActive
      userKeynote
      userMmr
      userPoint
      character
      deletedAt
    }
  }
`;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] =
    useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  // 가입 완료 버튼 활성화 여부를 상태로 관리
  const [isSignUpButtonEnabled, setSignUpButtonEnabled] = useState(false);
  const [registerUser] = useMutation<
    Pick<IMutation, "registerUser">,
    IMutationRegisterUserArgs
  >(REGISTER_USER);

  const setUserInfo = useSetRecoilState(userInfoState);

  const onClickSignUp = async (): Promise<void> => {
    // 메인 화면으로 전환
    try {
      const newUser = {
        userEmail: email,
        password,
        nickname,
      };

      const { data } = await registerUser({ variables: { newUser } });

      const registeredUser = data?.registerUser;
      // 회원가입 성공 후 처리 로직 작성

      alert("회원가입을 축하합니다.");
      setUserInfo({
        userId: registeredUser?.userId || '',
        character: registeredUser?.character || '',
        userKeynote: "origin" // TODO: 추후 수정
      });

      router.push("/signup/starting");
      console.log(data);
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
      nickname !== ""
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
  ]);

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
      setNicknameError("");
    } else if (specialCharactersRegex.test(enteredNickname)) {
      setNicknameError(
        "* 닉네임에는 한글, 영어, 숫자만 입력 가능합니다."
      );
    } else if (
      koreanContainsOnlyConsonantsRegex.test(enteredNickname) ||
      koreanContainsOnlyVowelsRegex.test(enteredNickname)
    ) {
      setNicknameError(
        "* 닉네임에 한글 모음, 자음만 사용하실 수는 없습니다."
      );
    } else if (whitespaceRegex.test(enteredNickname)) {
      setNicknameError("* 닉네임에 띄어쓰기를 사용할 수 없습니다.");
    } else if (enteredNickname.length < 2 || enteredNickname.length > 6) {
      setNicknameError("* 닉네임은 2~6자로 입력해주세요.");
    } else {
      setNicknameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    // validateEmail();
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    if (email === "") {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("* 올바른 이메일 형식으로 입력해주세요.");
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
  };

  return <SignUpUI {...props} />;
}
