import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import MainUI from "./Main.presenter";
import { IMainUIProps } from "./Main.types";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { socketState, usersIdInfoState } from "../../../commons/store";

const Main = () => {
  // 컨테이너는 로직만 담당하고, UI는 다른 파일로 분리해서 작성한다.
  const [isClicked, setIsClicked] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setSocketState] = useRecoilState(socketState);
  const [songTitle, setSongTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const router = useRouter();
  const [, setUsersIdInfoState] = useRecoilState(usersIdInfoState);

  const handleChangeAddress = async () => {
    // 인게임 화면으로 전환
    await router.push("/game");
  };

  const handleLoadingClick = () => {
    setShowLoading(true);
    setLoading(true);
  };

  const handleBattleModeClick = () => {
    setIsBattleClicked(true); // 배틀 모드 버튼 누른 상태로 변경
    console.log("1", socket);
    if (socket === null) {
      console.log(socket);
      // 💻 소켓 열고 소켓 통신 시작
      const newSocket = io("http://localhost:3000");
      // {
      // const newSocket = io("https://injungle.shop", {
      // path: "/api/socket.io",
      // });
      setSocket(newSocket);
      setSocketState(newSocket);

      // 소켓 연결 => 유저 정보 보내기
      newSocket.on(
        "connect",
        () => {
          console.log("Socket connected");
          const UserMatchDTO = {
            userId: "1",
            userMMR: 1000,
            nickName: "Tom",
            userActive: "connect",
            uerKeynote: "maleKey",
          };
          newSocket.emit("match_making", UserMatchDTO, () => {
            console.log("match_making sended to server");
          }); // 보낼 정보: UserMatchDTO = {userId, userMMR: number, nickName: string, userActive: userActiveStatus }
        }
        // You can send/receive messages, emit events, etc.
      );

      // 백에서 매칭 완료되면, 매칭된 유저 정보 받아오기
      newSocket.on("match_making", (data) => {
        // song_title, singer => 수락 화면에 집어넣기
        const { songTitle, singer } = data;

        setSongTitle(songTitle);
        setSinger(singer);
        // 수락 선택 화면으로 보내기
        if (songTitle && singer) {
          setShowModal(true);
        }
        console.log("match_making data received from server");
      });

      if (isAccepted) {
        // 수락 화면에서 버튼 누르는거에 따라 처리
        newSocket.emit("accept", true, () => {
          console.log("accept true sended to server");
        });
        // => 대기 화면
      }

      if (isRejected) {
        // 거절 유저는 소켓 끊음.
        newSocket.emit("accept", false, () => {
          // emit 보낸 이후에 소켓 끊을 수 있게 처리
          newSocket.off("match_making");
        });
        console.log("accept false sended to server");
        // => 모드 선택 화면
      }

      // 3명 다 수락되면 백에서 true 올거임
      newSocket.on("accept", (isMatched: boolean) => {
        if (isMatched) {
          console.log("accept true received");
          // Send to loading screen
          setShowLoading(true);
          newSocket.emit("loading");
        } else {
          // 3명 중에 거절하는 사람 생겨서(false 받음) 다시 버튼 선택(매칭 찾는 중)화면으로 보내기
          console.log("accept false received");
          setShowWaiting(false);
          setShowModal(false);
        }
      });

      // 로딩 화면에서 소켓 통신으로 노래 data 받음
      newSocket.on("loading", async (data) => {
        const {
          songTitle,
          singer,
          songLyrics,
          songFile,
          songGender,
          songMale,
          songMaleUp,
          songMaleDown,
          songFemale,
          songFemaleUp,
          songFemaleDown,
          vocalMale,
          vocalMaleUp,
          vocalMaleDown,
          vocalFemale,
          vocalFemaleUp,
          vocalFemaleDown,
        } = data;
        console.log("1111111111");
        await fetch("/music/snowflower_origin.wav");
        console.log("2222222222");
        await fetch("/music/snowflower_3keyup.wav");
        console.log("3333333333");
        await fetch("/music/snowflower_3keydown.wav");

        console.log(songTitle);
        console.log(singer);
        console.log(songLyrics);
        console.log(songFile);
        console.log(songGender);
        console.log(songMale);
        console.log(songMaleUp);
        console.log(songMaleDown);
        console.log(songFemale);
        console.log(songFemaleUp);
        console.log(songFemaleDown);
        console.log(vocalMale);
        console.log(vocalMaleUp);
        console.log(vocalMaleDown);
        console.log(vocalFemale);
        console.log(vocalFemaleUp);
        console.log(vocalFemaleDown);

        console.log("true received");

        // 다운이 다 되면 아래를 보냄
        newSocket.emit("game_ready", true, () => {
          console.log("game_ready true sended to server");
        });

        newSocket.on("game_ready", async (userData) => {
          // userId, 게임 참가한 유저의 소켓 id, 자기를 제외한 두명의 정보 저장해야됨.
          // userData에는 socketId만 담겨서 올거임.
          const { user1, user2, user3 } = userData;
          const myId = newSocket.id;
          const otherUsers = [user1, user2, user3].filter(
            (user) => user.socketId !== myId
          );
          setUsersIdInfoState([myId, ...otherUsers]);

          console.log("game_ready true received");
          if (user1?.socketId && user2?.socketId && user3?.socketId) {
            setShowLoading(false);
            setLoading(false);
            try {
              await handleChangeAddress(); // 로딩 화면에서 인게임으로 화면 렌더링
            } catch (error) {
              console.error(
                "Error occurred while navigating to '/game':",
                error
              );
            }
          }
        });
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  };

  useEffect(() => {
    const simulateLoading = () => {
      if (showLoading) {
        setTimeout(() => {
          if (progress < 100) {
            setProgress(progress + 10); // Increase the progress by 10% every 1 second
          } else {
            setLoading(false);
          }
        }, 1000);
      }
    };

    simulateLoading();

    return () => {
      if (timer) {
        clearTimeout(timer); // 타이머 취소
      }
    };
  }, [showLoading, progress]);

  const handleClick = () => {
    setIsClicked(true);
  };

  const [isBattleClicked, setIsBattleClicked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [showWaiting, setShowWaiting] = useState(false);

  const handleMatchCancel = () => {
    // 매칭 취소 버튼 눌렀을 때 작동
    setIsBattleClicked(false); // 배틀 모드 버튼 누르지 않은 상태로 변경
    setTimer(0); // 타이머 0으로 초기화
  };

  const handleMatchAccept = () => {
    // 로딩 모달 띄우기
    setShowModal(false); // 모달 끄기
    setShowWaiting(true); // 대기화면 띄우기
    setIsAccepted(true);
    setIsRejected(false);
    // setShowLoading(true);
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

    // 타이머 5초 되면 => 소켓 신호 오는 걸로 변경할 예정
    if (timer === 1000) {
      setShowModal(true);
      // 매칭 취소 or 거절하기 or 대기화면 or 타이머 600초 되면 타이머 종료
      setTimer(0); // 타이머 0으로 초기화
      return () => {
        clearInterval(interval);
      };
    }

    return () => {
      clearInterval(interval); // 타이머 종료
    };
  }, [isBattleClicked, timer]);

  const formatTime = (time: number): string => {
    // 타이머 시간 포맷
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const props: IMainUIProps = {
    isClicked,
    handleClick,
    isBattleClicked,
    handleMatchCancel,
    timer,
    formatTime,
    showModal,
    setShowModal,
    showLoading,
    setShowLoading,
    handleMatchAccept,
    loading,
    handleBattleModeClick,
    progress,
    handleMatchDecline,
    songTitle,
    singer,
    setShowWaiting,
    showWaiting,
    handleLoadingClick,
  };

  return <MainUI {...props} />;
};

export default Main;
