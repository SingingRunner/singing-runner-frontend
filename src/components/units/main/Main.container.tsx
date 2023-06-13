import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import MainUI, { MainUIProps } from "./Main.presenter";

const Main = () => {
  // 컨테이너는 로직만 담당하고, UI는 다른 파일로 분리해서 작성한다.
  const [isClicked, setIsClicked] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleBattleModeClick = () => {
    if (socket === null) {
      // 소켓 열고 소켓 통신 시작
      const newSocket = io("https://injungle.shop");
      setSocket(newSocket);

      // Add event listeners or perform any necessary socket communication logic
      newSocket.on(
        "connect",
        () => {
          console.log("Socket connected");
          newSocket.emit("match_making", "Hello, server!"); // 보낼 정보: UserMatchDTO = {userI, userMMR: number, nickName: string, userActive: userActiveStatus }
        }
        // You can send/receive messages, emit events, etc.
      );
      // Send a message to the server
      newSocket.on("match_making", () => {
        // song_title, singer => 수락 화면에 집어넣기
        console.log("Disconnected from server");
      });

      // 수락 화면에서 버튼 누르는거에 따라 처리
      newSocket.emit("accept", () => {
        // true, false
        console.log("Disconnected from server");
      }); // 3명 다 수락되면 백에서 true 올거임. 거절한 유저는 소켓 끊는다. => 버튼 선택화면으로 보내기
      // 수락했는데 남은 나머지는 false 받을거임. => 모달 꺼지고 대기화면 시간 이을 수 있으면 잇고 아니면 00:00으로 보내기

      // on으로 true 받으면 로딩 메세지 던져줌.
      newSocket.on("accept", () => {
        // true 받음
        console.log("Disconnected from server");
      });

      // 로딩화면 렌더링 => 소켓 로딩 메세지 emit으로 보낸다.
      // newSocket.emit("loading", msg);

      // 그러면 노래파일 올거임. 다 오면, 게임 스타트 => 게임 스타트 메세지 emit으로 보낸다. (true)

      // 3명 다 true 보내고 나면, true 올거임. => 인게임 화면 렌더링

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      // Server-side event listener for the 'chat message' event
      newSocket.on("chat message", (msg) => {
        console.log("Received message:", msg);
        // Process the received message and emit to other clients
        newSocket.emit("chat message", msg);
      });

      // You can also update any state or perform other actions related to the battle mode
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

  const handleLoading = () => {
    // 로딩 모달 띄우기
    setShowModal(false);
    if (!showModal) {
      setShowModal(false);
    }
    setShowLoading(true);
  };

  const handleBattleClick = () => {
    // 배틀 모드 버튼 눌렀을 때 작동
    setIsBattleClicked(true); // 배틀 모드 버튼 누른 상태로 변경
  };

  const handleMatchCancel = () => {
    // 매칭 취소 버튼 눌렀을 때 작동
    setIsBattleClicked(false); // 배틀 모드 버튼 누르지 않은 상태로 변경
    setTimer(0); // 타이머 0으로 초기화
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
    if (timer === 1) {
      setShowModal(true);
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

  const props: MainUIProps = {
    isClicked,
    handleClick,
    isBattleClicked,
    handleBattleClick,
    handleMatchCancel,
    timer,
    formatTime,
    showModal,
    setShowModal,
    showLoading,
    setShowLoading,
    handleLoading,
    loading,
    handleBattleModeClick,
    progress,
  };

  return <MainUI {...props} />;
};

export default Main;
