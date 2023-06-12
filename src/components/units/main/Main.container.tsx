import { useEffect, useState } from "react";
import MainUI from "./Main.presenter";

export default function Main() {
  // 컨테이너는 로직만 담당하고, UI는 다른 파일로 분리해서 작성한다.
  const [isClicked, setIsClicked] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const simulateLoading = () => {
      if (showLoading) {
        setTimeout(() => {
          if (progress < 100) {
            setProgress(progress + 10); // Increase the progress by 10% every 1 second
            // if (progress === 20 || progress === 40)  {
            //   setProgress(progress + 20);
            // }
            // if (progress === 70) {
            //   setProgress(progress + 30);
            // }
          } else {
            setLoading(false);
          }
        }, 1000);
      }
    };

    simulateLoading();

    return () => clearTimeout();
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

  return (
    <MainUI
      isClicked={isClicked}
      handleClick={handleClick}
      isBattleClicked={isBattleClicked}
      handleBattleClick={handleBattleClick}
      handleMatchCancel={handleMatchCancel}
      timer={timer}
      formatTime={formatTime}
      showModal={showModal}
      setShowModal={setShowModal}
      showLoading={showLoading}
      setShowLoading={setShowLoading}
      handleLoading={handleLoading}
      loading={loading}
      progress={progress}
    />
  );
}
