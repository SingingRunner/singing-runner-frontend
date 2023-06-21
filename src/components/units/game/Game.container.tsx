// Game.container.tsx
import { useContext, useEffect, useState } from "react";
import GameUI from "./Game.presenter";
import Sound from "./sound/Sound";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../commons/store";
import { IPlayersInfo, ISocketItem } from "./Game.types";
import { ITEM_DURATION } from "./itemInfo/ItemInfo.styles";

const UNMUTE_DECIBEL = -70; // mute 아이템을 해제시키는 데시벨 크기

export default function Game() {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  // 로딩 화면을 관리하는 상태
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const [songInfo, setSongInfo] = useState({ title: "", singer: "" });

  // 현재 플레이어의 정보
  const userInfo = useRecoilValue(userInfoState);

  // 전체 유저의 정보
  const [playersInfo, setPlayersInfo] = useState<IPlayersInfo[]>([]);

  // ⭐️ 현재의 mrKey를 저장하는 상태 -> 현재 유저의 기본 설정값으로 초기화
  const [mrKey, setMrKey] = useState(userInfo.userKeynote);

  // mute 아이템 발동 시 측정한 데시벨의 상태
  const [decibel, setDecibel] = useState(0);
  // mute 공격을 당한 경우, 데시벨 측정 시작을 위한 상태
  const [isMuteActive, setIsMuteActive] = useState(false);
  // 현재 유저에게 활성화된 아이템을 관리하는 상태
  const [appliedItems, setAppliedItems] = useState<string[]>([]);

  // 현재 유저에게 활성화된 아이템을 전부 담은 목록

  useEffect(() => {
    // 로그인한 유저의 정보 저장
    if (playersInfo.length === 0) {
      setPlayersInfo([
        {
          userId: userInfo.userId,
          character: userInfo.character,
          activeItem: "",
          score: 0,
          position: "mid",
        },
      ]);
    }
  }, [userInfo]);

  const [muteAttack, setMuteAttack] = useState({
    mid: false,
    right: false,
    left: false,
  });

  useEffect(() => {
    // 다른 유저로부터 공격이 들어옴
    socket?.on("use_item", (data: ISocketItem) => {
      if (data.userId !== userInfo.userId) onItem(data.item);
      else if (
        data.userId === userInfo.userId &&
        ["keyUp", "keyDown"].includes(data.item)
      )
        onItem(data.item);

      setPlayersInfo((prev) => {
        const temp = [...prev];
        temp.forEach((user, i) => {
          // frozen | mute | cloud -> 공격자 빼고 적용
          if (["mute", "cloud", "frozen"].includes(data.item)) {
            if (user.userId !== data.userId) {
              temp[i].activeItem = data.item;
              if (data.item === "mute")
                setMuteAttack((prev) => ({ ...prev, [user.position]: true }));
            }
            // 공격자가 현재 유저가 아닌 경우 화면에 적용
          }
          // keyUp | keyDown -> 모두 적용
          else {
            temp[i].activeItem = data.item;
          }
        });
        return temp;
      });
    });

    // 다른 유저가 아이템에서 탈출
    socket?.on("escape_item", (data: ISocketItem) => {
      // 탈출한 유저가 현재 유저인 경우
      if (data.userId === userInfo.userId) {
        offItem(data.item);
      }
      setPlayersInfo((prev) => {
        const temp = [...prev];
        temp.forEach((user, i) => {
          if (user.userId === data.userId) {
            if (user.activeItem === data.item) temp[i].activeItem = "";
            if (data.item === "mute")
              setMuteAttack((prev) => ({ ...prev, [user.position]: false }));
          }
        });
        return temp;
      });
    });
  }, [socket]);

  /** 현재 유저 화면에 아이템 효과를 시작하는 함수 */
  const onItem = (item: string) => {
    setAppliedItems((prev) => [...prev, item]);

    // 키 변경 | 음소거
    // frozen은 별도 함수에서 적용
    if (item === "keyUp") setMrKey("keyUp");
    else if (item === "keyDown") setMrKey("keyDown");
    else if (item === "mute") setIsMuteActive(true);

    // 아이템 효과 종료 처리
    // frozen 아이템은 유저가 직접 종료
    // if (item === "frozen") return;
    // 나머지 아이템은 ITEM_DURATION 뒤에 자동 종료
    setTimeout(() => {
      socket?.emit("escape_item", { item, userId: userInfo.userId });
    }, ITEM_DURATION);
  };

  /** 현재 유저의 아이템 효과를 종료하는 함수 */
  const offItem = (item: string) => {
    setAppliedItems((prev) => {
      const temp = [...prev];
      // 처음으로 일치하는 요소 삭제
      const index = temp.findIndex((i) => i === item);
      if (index !== -1) temp.splice(index, 1);
      return temp;
    });
    if (item === "keyUp" || item === "keyDown") setMrKey("origin");
  };

  /** 데시벨을 측정하는 함수 */
  const checkDecibel = () => {
    // console.log("decibel", decibel);
    if (isMuteActive && decibel !== 0 && decibel > UNMUTE_DECIBEL) {
      setIsMuteActive(false);
      socket?.emit("escape_item", { item: "mute", userId: userInfo.userId });
    }
  };

  useEffect(() => {
    if (isMuteActive) checkDecibel();
  }, [isMuteActive, decibel]);

  return (
    <>
      <GameUI
        songInfo={songInfo}
        playersInfo={playersInfo}
        decibel={decibel}
        appliedItems={appliedItems}
        offItem={offItem}
        isLoadComplete={isLoadComplete}
        progress={progress}
        startTime={startTime}
        muteAttack={muteAttack}
      />
      <Sound
        setSongInfo={setSongInfo}
        mrKey={mrKey}
        setDecibel={setDecibel}
        setPlayersInfo={setPlayersInfo}
        appliedItems={appliedItems}
        isLoadComplete={isLoadComplete}
        setIsLoadComplete={setIsLoadComplete}
        progress={progress}
        setProgress={setProgress}
        setStartTime={setStartTime}
      />
    </>
  );
}
