import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { INicknameUIProps } from "./Nickname.types";
import NicknameUI from "./Nickname.presenter";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationRegisterUserWithKakaoArgs,
} from "../../../commons/types/generated/types";

import { useRecoilState } from "recoil";
import { userIdState, kakaoUserResponseState } from "../../../commons/store";
import {
  IS_NICKNAME_TAKEN,
  REGISTER_USER_WITH_KAKAO,
} from "./Nickname.queries";


export default function Nickname() {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  // 가입 완료 버튼 활성화 여부를 상태로 관리
  const [isNicknameButtonEnabled, setNicknameButtonEnabled] = useState(false);
  const [registerUserWithKakao] = useMutation<
    Pick<IMutation, "registerUserWithKakao">,
    IMutationRegisterUserWithKakaoArgs
  >(REGISTER_USER_WITH_KAKAO);

  const [userId, setUserId] = useRecoilState(userIdState);
  const [nicknameCheck, { data: nicknameCheckData }] = useLazyQuery(
    IS_NICKNAME_TAKEN,
    {
      fetchPolicy: "network-only",
    }
  );
  const [nicknameVerified, setNicknameVerified] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameCheckClicked, setIsNicknameCheckClicked] = useState(false);
  // 회원가입 눌렀을 때, "이미 사용중입니다."라는 문구가 안 뜨게 방지하는 플래그
  const [isCompleteClicked, setIsCompleteClicked] = useState(false);
  const [kakaoUserResponse] = useRecoilState(kakaoUserResponseState);

  const router = useRouter();

  const onClickComplete = async (): Promise<void> => {
    setIsCompleteClicked(true);

    if (!kakaoUserResponse) {
      // 자세한 처리 방법은 여기에 구현하세요.
      console.error("kakaoUserResponse is not available.");
    } else {
      // 메인 화면으로 전환
      try {
        const newUser = {
          kakaoUserResponse,
          nickname,
        };

        const { data } = await registerUserWithKakao({
          variables: { ...newUser },
        });
        const registeredUser = data?.registerUserWithKakao.user;

        setUserId(registeredUser?.userId || "");

        console.log("registeredUser: ", registeredUser);
        console.log(userId);

        router.push("/signup/starting");
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
  };

  useEffect(() => {
    // 유효성 검사와 중복 확인 상태에 따라 가입 완료 버튼 활성화 여부를 업데이트합니다.
    if (
      nicknameError === "" &&
      nickname !== "" &&
      nicknameVerified &&
      isNicknameCheckClicked
    ) {
      setNicknameButtonEnabled(true);
    } else {
      setNicknameButtonEnabled(false);
    }
  }, [nicknameError, nickname, nicknameVerified, isNicknameCheckClicked]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError("");
    setNicknameMessage("");
    setIsNicknameCheckClicked(false);
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

  const checkDuplicateNickname = async () => {
    console.log("닉네임 중복 확인 버튼 눌림");
    nicknameCheck({ variables: { nickname } });
    setNicknameVerified(false);
    setIsNicknameCheckClicked(true);
  };

  useEffect(() => {
    const nicknameIsTaken = nicknameCheckData?.isNicknameTaken;

    if (!isCompleteClicked && nicknameIsTaken === true) {
      setNicknameError("* 닉네임이 이미 사용 중입니다.");
      setNicknameMessage("");
    } else if (!isCompleteClicked && nicknameIsTaken === false) {
      setNicknameVerified(true);
      setNicknameMessage("사용 가능한 닉네임입니다.");
    }
  }, [nicknameCheckData]);

  const dummyClick = () => {
    console.log("dummy");
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sound/effect/button.mp3");
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isNicknameButtonEnabled) {
        audioRef.current?.play();
        onClickComplete();
      }
    }
  };

  const props: INicknameUIProps = {
    onClickComplete,
    nickname,
    handleNicknameChange,
    nicknameError,
    isNicknameButtonEnabled,
    dummyClick,
    onKeyDown,
    checkDuplicateNickname,
    nicknameMessage,
    validateNickname,
  };

  return <NicknameUI {...props} />;
}
