import { useEffect, useState, useContext, ChangeEvent } from "react";
import MainUI from "./Main.presenter";
import { IMainUIProps } from "./Main.types";
import { useRouter } from "next/router";
import { SocketContext } from "../../../commons/contexts/SocketContext";

const Main = () => {
  // 소켓, 소켓 연결하는 함수 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket, socketConnect } = socketContext;

  const [isClicked, setIsClicked] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [isBattleClicked, setIsBattleClicked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  // const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value);
  // };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangePasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const router = useRouter();

  const handleSignupClick = () => {
    setIsSignupClicked(true);
  };

  const handleLoginClick = () => {
    setIsLoginClicked(true);
  };

  const handleChangeAddress = () => {
    // 인게임 화면으로 전환
    router.push("/game");
  };
  useEffect(() => {
    if (socket) {
      socket.on("accept", (isMatched: boolean) => {
        if (isMatched) {
          console.log("accept true received");
          socket.emit("loading");
          handleChangeAddress(); // 인게임 화면으로 전환
        } else {
          // 거절하는 사람 있으면 다시 게임 찾는 중 화면으로 보내기
          console.log("accept false received");
          setShowWaiting(false);
          setShowModal(false);
        }
      });
      socket.on("match_making", (data) => {
        // 매칭 완료되면, 매칭된 유저 정보 받아오기
        const { songTitle, singer } = data; // song_title, singer => 수락 화면에 집어넣기
        console.log(data);
        setSongTitle(songTitle);
        setSinger(singer);

        if (songTitle && singer) {
          setShowModal(true); // 수락 화면 띄우기
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && isAccepted) {
      // 수락 누른 경우
      console.log("accept true sended to server");
      socket.emit("accept", true);
      setIsAccepted(false);
      // => 대기 화면으로 이동
    }
    if (socket && isRejected) {
      // 거절 누른 경우
      console.log("accept false sended to server");
      socket.emit("accept", false);
      setIsRejected(false);
      // => 모드 선택 화면으로 이동
    }
  }, [isAccepted, isRejected, showWaiting, socket]);

  const handleClick = () => {
    setIsClicked(true);

    // handleChangeAddress(); 테스트용
  };

  // 🚨 로그인 기능 추가하기 전에 임시로 사용할 유저 정보
  const [dummyUserId, setDummyUserId] = useState("");
  const UserMatchDto = {
    userId: dummyUserId,
    userMmr: 1000,
    nickName: "Tom",
    userActive: "connect",
    uerKeynote: "maleKey",
  };

  const handleBattleModeClick = () => {
    setIsBattleClicked(true); // => 배틀 모드 버튼 누른 상태로
    // 소켓 연결
    const newSocket = socketConnect();
    // 소켓 연결 => 유저 정보 보내기
    newSocket.emit("match_making", { UserMatchDto, accept: true });
  };

  const handleMatchCancel = () => {
    socket?.emit("match_making", { UserMatchDto, accept: false }); // 매칭 취소 백엔드에 알림
    setIsBattleClicked(false); // 배틀 모드 버튼 누르지 않은 상태로 변경
    setTimer(0); // 타이머 0으로 초기화
  };

  const handleMatchAccept = () => {
    // 매칭 수락 버튼 눌렀을 때 작동
    setShowModal(false); // 모달 끄기
    setShowWaiting(true); // 대기화면 띄우기
    setIsRejected(false);
    setIsAccepted(true);
  };

  const handleMatchDecline = () => {
    // 매칭 거절 버튼 눌렀을 때 작동
    setShowModal(false); // 모달 끄기
    setIsBattleClicked(false); // 배틀 모드 버튼 누르지 않은 상태로 변경
    setTimer(0); // 타이머 0으로 초기화
    setIsAccepted(false);
    setIsRejected(true);
  };

  useEffect(() => {
    // 타이머 작동
    let interval: NodeJS.Timeout;

    if (isBattleClicked) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval); // 타이머 종료
    };
  }, [isBattleClicked, timer]);

  const formatTime = (time: number): string => {
    // 타이머 시간 형식 "00:00"
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const props: IMainUIProps = {
    isClicked,
    handleClick,
    isBattleClicked,
    handleMatchCancel,
    timer,
    formatTime,
    showModal,
    setShowModal,
    handleMatchAccept,
    handleBattleModeClick,
    handleMatchDecline,
    songTitle,
    singer,
    setShowWaiting,
    showWaiting,
    setDummyUserId,
    handleLoginClick,
    isLoginClicked,
    handleSignupClick,
    isSignupClicked,
    email,
    onChangePassword,
    password,
    onChangePasswordCheck,
    passwordCheck,
    onChangeNickname,
    nickname,
    handleEmailChange,
    emailError,
  };

  return <MainUI {...props} />;
};

export default Main;
