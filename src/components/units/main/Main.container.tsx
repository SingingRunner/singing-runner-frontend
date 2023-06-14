import { useEffect, useState, useContext } from "react";
import MainUI from "./Main.presenter";
import { IMainUIProps } from "./Main.types";
import { useRouter } from "next/router";
// game.container로 옮김.
// import { useRecoilState } from "recoil";
// import { usersIdInfoState } from "../../../commons/store";
import { SocketContext } from "../../../commons/contexts/SocketContext";

const Main = () => {
  // loading에 필요한 useState, userIDInfoState game.container로 옮김.

  const socket = useContext(SocketContext);
  const [isClicked, setIsClicked] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (socket && isAccepted) {
      // 수락 화면에서 버튼 누르는거에 따라 처리
      socket.emit("accept", true, () => {
        console.log("accept true sended to server");
      });
      // => 대기 화면
    }
    if (socket && isRejected) {
      // 거절 유저는 소켓 끊음.
      socket.emit("accept", false, () => {
        // emit 보낸 이후에 소켓 끊을 수 있게 처리
        socket.off("match_making");
      });
      console.log("accept false sended to server");
      // => 모드 선택 화면
    }
    if (socket && showWaiting) {
      // 3명 다 수락되면 백에서 true 올거임
      socket.on("accept", (isMatched: boolean) => {
        if (isMatched) {
          console.log("accept true received");
          socket.emit("loading", () => {
            // "loading" emit 하고 나서 인게임 화면으로 렌더링
            handleChangeAddress();
          });
          // 인게임 렌더링 => 로딩화면 game.container로 옮김.
        } else {
          // 3명 중에 거절하는 사람 생겨서(false 받음) 다시 버튼 선택(매칭 찾는 중)화면으로 보내기
          console.log("accept false received");
          setShowWaiting(false);
          setShowModal(false);
        }
      });
    }
    // 원래 있던 코드 game.container로 옮김.
  }, [isAccepted, isRejected, showWaiting, socket]);

  const handleChangeAddress = () => { // 인게임 화면으로 전환
    router.push("/game");
  };

  const handleBattleModeClick = () => {
    setIsBattleClicked(true); // 배틀 모드 버튼 누른 상태로 변경
    console.log("1", socket);
    if (socket) {
      // 소켓 열고 소켓 통신 시작 => 소켓 전역 변수로 대체

      console.log(socket);
      const UserMatchDTO = {
        userId: "1",
        userMmr: 1000,
        nickName: "Tom",
        userActive: "connect",
        uerKeynote: "maleKey",
      };
      // 소켓 연결 => 유저 정보 보내기

      socket.emit("match_making", UserMatchDTO, () => {
        console.log("match_making sended to server");
      }); // 보낼 정보: UserMatchDTO = {userId, userMMR: number, nickName: string, userActive: userActiveStatus }

      socket.on("match_making", (data) => {     // 백에서 매칭 완료되면, 매칭된 유저 정보 받아오기
        const { songTitle, singer } = data;     // song_title, singer => 수락 화면에 집어넣기   

        setSongTitle(songTitle);
        setSinger(singer);

        if (songTitle && singer) {
          setShowModal(true);                  // 수락 화면 띄우기
        }
        console.log("match_making data received from server");
      });

      // on("loading") => 노래 받는 원래 코드 game.container로 옮김.

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  };

  // 로딩 화면 보여주기 game.container로 옮김.

  const handleClick = () => {
    setIsClicked(true);
    // handleChangeAddress(); 테스트용
  };

  const [isBattleClicked, setIsBattleClicked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleMatchCancel = () => {   // 매칭 취소 버튼 눌렀을 때 작동
    setIsBattleClicked(false);        // 배틀 모드 버튼 누르지 않은 상태로 변경
    setTimer(0);                      // 타이머 0으로 초기화
  };

  const handleMatchAccept = () => {   // 매칭 수락 버튼 눌렀을 때 작동
    setShowModal(false);              // 모달 끄기
    setShowWaiting(true);             // 대기화면 띄우기
    setIsAccepted(true);
    setIsRejected(false);
  };

  const handleMatchDecline = () => {   // 매칭 거절 버튼 눌렀을 때 작동
    setShowModal(false);               // 모달 끄기
    setIsBattleClicked(false);         // 배틀 모드 버튼 누르지 않은 상태로 변경
    setTimer(0);                       // 타이머 0으로 초기화
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

  const formatTime = (time: number): string => {  // 타이머 시간 포맷
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
    handleMatchAccept,
    handleBattleModeClick,
    handleMatchDecline,
    songTitle,
    singer,
    setShowWaiting,
    showWaiting,
  };

  return <MainUI {...props} />;
};

export default Main;
