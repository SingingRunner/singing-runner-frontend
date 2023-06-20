// Game.container.tsx
import { useContext, useEffect, useState } from "react";
import GameUI from "./Game.presenter";
import Sound from "./sound/Sound";
import { ITEM_DURATION } from "./itemInfo/ItemInfo";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../commons/store";
import { IPlayersInfo } from "./Game.types";

const INIT_ITEM_EFFECT = {
  mute: false,
  frozen: false,
  cloud: false,
  keyDown: false,
  keyUp: false,
  shield: false,
};

const UNMUTE_DECIBEL = -65; // mute 아이템을 해제시키는 데시벨 크기

export default function Game() {
  const totalPlayers = 3;
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [songInfo, setSongInfo] = useState({ title: "", singer: "" });
  // 현재 플레이어의 정보
  const userInfo = useRecoilValue(userInfoState);

  // 전체 유저의 정보
  const [playersInfo, setPlayersInfo] = useState<IPlayersInfo[]>([
    {
      userId: userInfo.userId,
      character: userInfo.character,
      activeItem: "",
      score: 0,
    },
  ]);

  // ⭐️ 현재의 mrKey를 저장하는 상태 -> 현재 유저의 기본 설정값으로 초기화
  const [mrKey, setMrKey] = useState(userInfo.userKeynote);

  // mute 아이템 발동 시 측정한 데시벨의 상태
  const [decibel, setDecibel] = useState(0);
  // mute 공격을 당한 경우, 데시벨 측정 시작을 위한 상태
  const [isMuteActive, setIsMuteActive] = useState(false);
  // 현재 유저에게 활성화된 아이템을 관리하는 상태
  const [activeItem, setActiveItem] = useState({ ...INIT_ITEM_EFFECT });
  // 모든 유저들의 활성화된 아이템을 프로필 옆에 나타내기 위해 저장하는 상태 (["나", "오른쪽", "왼쪽"])
  // 마지막에 활성화된 아이템 하나만 저장
  const [playersActiveItem, setPlayersActiveItem] = useState(["", "", ""]);
  // 로딩 화면을 관리하는 상태
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);

  /** 유저들의 활성화된 아이템을 변경하는 함수 */
  // 🚨 1 - 다른 유저들에게 공격이 들어가면 호출
  const changePlayersActiveItem = (playerIndex: number, item: string) => {
    setPlayersActiveItem((prev) => {
      const temp = [...prev];
      temp[playerIndex] = item;
      return temp;
    });

    // 5초 뒤에 자동으로 종료
    if (item === "keyUp" || item === "keyDown" || item === "mute") {
      setTimeout(() => {
        setPlayersActiveItem((prev) => {
          const temp = [...prev];
          temp[playerIndex] = "";
          return temp;
        });
      }, ITEM_DURATION);
    }
  };

  useEffect(() => {
    if (socket) {
      // 다른 유저로부터 공격이 들어옴
      socket.on("use_item", (data) => {
        // 아이템이 눈사람 | 음소거 -> 현재 플레이어와 공격자가 아닌 플레이어 적용
        if (data instanceof Object) {
          onItem(data.item);
          // for (let i = 1; i < 3; i++) {
          // if (data.user === usersIdInfo[i]) continue; // 공격자 제외
          // if (data.user === usersIdInfo[0]) continue; // 현재 플레이어는 위에서 onItem으로 바로 적용되므로 제외
          // changePlayersActiveItem(i, data.item);
          // }
        }

        // 아이템이 키업 | 키다운 -> 모두에게 적용
        else if (!(data instanceof Object)) {
          onItem(data);
          for (let i = 0; i < 3; i++) {
            changePlayersActiveItem(i, data);
          }
        }
      });

      // 다른 유저가 아이템에서 탈출
      socket.on("escape_item", (data) => {
        // usersIdInfo.forEach((user, i) => {
        //   if (user === data) {
        //     changePlayersActiveItem(i, "");
        //   }
        // });
      });
    }
  }, [socket]);

  /** 현재 유저에게 아이템 효과를 시작하는 함수 */
  const onItem = (item: string) => {
    setActiveItem({
      ...INIT_ITEM_EFFECT, // 나머지 효과 모두 종료
      [item]: true,
    });

    // 모든 유저의 아이템 효과를 저장하는 상태에 반영
    changePlayersActiveItem(0, item);

    // 키 변경 | 음소거
    // frozen은 별도 함수에서 적용
    if (item === "keyUp") {
      setMrKey("keyUp");
    } else if (item === "keyDown") {
      setMrKey("keyDown");
    } else if (item === "mute") {
      setIsMuteActive(true);
    }

    // 아이템 효과 종료 처리
    // frozen 아이템은 유저가 직접 종료
    if (item === "frozen") return;
    // 나머지 아이템은 5초 뒤에 자동 종료
    setTimeout(() => offItem(item), ITEM_DURATION);
  };

  /** 데시벨을 측정하는 함수 */
  const checkDecibel = () => {
    console.log("decibel", decibel);
    if (isMuteActive && decibel > UNMUTE_DECIBEL) offItem("mute");
  };

  useEffect(() => {
    if (isMuteActive) {
      checkDecibel();
    }
  }, [isMuteActive, decibel]);

  /** 아이템 효과를 종료하는 함수 */
  const offItem = (item: string) => {
    setActiveItem({
      ...activeItem,
      [item]: false,
    });
    changePlayersActiveItem(0, "");
    if (item === "keyUp" || item === "keyDown") setMrKey("origin");
    else if (item === "mute") setIsMuteActive(false);
    // 🚨 음소거와 눈사람 아이템 공격이 종료됐다고 서버에 알리기
    if (item === "mute" || item === "frozen") {
      socket?.emit("escape_item");
    }
  };

  return (
    <>
      <GameUI
        songInfo={songInfo}
        playersInfo={playersInfo}
        decibel={decibel}
        totalPlayers={totalPlayers}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        playersActiveItem={playersActiveItem}
        offItem={offItem}
        isLoadComplete={isLoadComplete}
        progress={progress}
        startTime={startTime}
      />
      <Sound
        setSongInfo={setSongInfo}
        mrKey={mrKey}
        setDecibel={setDecibel}
        setPlayersInfo={setPlayersInfo}
        activeItem={activeItem}
        isLoadComplete={isLoadComplete}
        setIsLoadComplete={setIsLoadComplete}
        progress={progress}
        setProgress={setProgress}
        setStartTime={setStartTime}
      />
    </>
  );
}
