// Game.container.tsx
import { useContext, useEffect, useState } from "react";
import GameUI from "./Game.presenter";
import Sound from "./sound/Sound";
import { useRecoilValue } from "recoil";
import { usersIdInfoState } from "../../../commons/store";
import { ITEM_DURATION } from "./itemInfo/ItemInfo";
import { SocketContext } from "../../../commons/contexts/SocketContext";

const INIT_ITEM_EFFECT = {
  mute: false,
  frozen: false,
  cloud: false,
  keyDown: false,
  keyUp: false,
  shield: false,
};

const ITEM_GET_INTERVAL = 15000; // 아이템 발생 텀
const UNMUTE_DECIBEL = -65; // mute 아이템을 해제시키는 데시벨 크기

export default function Game() {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const usersIdInfo = useRecoilValue(usersIdInfoState);

  // ⭐️ 총 플레이어 수
  const totalPlayers = 3;
  // ⭐️ 현재의 mrKey를 저장하는 상태
  const [mrKey, setMrKey] = useState("origin");
  // mute 아이템 발동 시 측정한 데시벨의 상태
  const [decibel, setDecibel] = useState(0);
  // mute 공격을 당한 경우, 데시벨 측정 시작을 위한 상태
  const [isMuteActive, setIsMuteActive] = useState(false);
  // 모든 유저의 점수를 관리하는 상태
  const [playersScore, setPlayersScore] = useState([0, 0, 0]);
  // 현재 유저에게 활성화된 아이템을 관리하는 상태
  const [activeItem, setActiveItem] = useState({ ...INIT_ITEM_EFFECT });
  // 모든 유저들의 활성화된 아이템을 프로필 옆에 나타내기 위해 저장하는 상태 (["나", "오른쪽", "왼쪽"])
  // 마지막에 활성화된 아이템 하나만 저장
  const [playersActiveItem, setPlayersActiveItem] = useState(["", "", ""]);
  // 로딩 화면을 관리하는 상태
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [itemList, setItemList] = useState([""]);

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
          for (let i = 1; i < 3; i++) {
            if (data.user === usersIdInfo[i]) continue; // 공격자 제외
            // if (data.user === usersIdInfo[0]) continue; // 현재 플레이어는 위에서 onItem으로 바로 적용되므로 제외
            // changePlayersActiveItem(i, data.item);
          }
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
        usersIdInfo.forEach((user, i) => {
          if (user === data) {
            changePlayersActiveItem(i, "");
          }
        });
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

  // 가지고 있는 아이템 목록
  useEffect(() => {
    // 10초 간격으로 아이템 획득 요청
    const interval = setInterval(() => {
      socket?.emit("get_item");
    }, ITEM_GET_INTERVAL);

    // 🚨 아이템 받기
    if (socket) {
      socket.on("get_item", (item: string) => {
        getItem(item);
      });
    }

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 interval을 정리합니다.
    };
  }, [socket]);

  /** 아이템 획득 함수 */
  const getItem = (item: string) => {
    setItemList((prev) => {
      const temp = [...prev];
      if (temp.length === 2) {
        // itemList에 아이템이 두 개 있을 때
        temp.shift(); // 첫 번째 아이템을 제거
      }
      temp.push(item);
      return temp;
    });
  };

  /** 아이템 사용 함수 */
  const useItem = (item: string) => {
    /* 🚨 아이템 사용 */
    socket?.emit("use_item", item);
    setItemList((prev) => {
      // 같은 아이템이 두 개 있으면 하나만 제거
      if (prev[0] === prev[1]) return prev.slice(1);
      return prev.filter((i) => i !== item); // itemList에서 해당 아이템을 제외한 나머지만 반환
    });
    // keyUp과 keyDown은 현재 유저에게도 공격이 들어감
    if (item === "keyUp" || item === "keyDown") onItem(item);
    // ⭐️ 나머지 아이템들은 현재 유저를 제외한 나머지 플레이어들에게 아이템 공격 표시
    if (item === "mute") {
      changePlayersActiveItem(1, item);
      changePlayersActiveItem(2, item);
    }
  };

  if (socket) {
    // 로딩 화면에서 소켓 통신으로 노래 data 받음
    socket.on("loading", async () => {
      await fetch("/music/snowflower_origin.wav");
      await fetch("/music/snowflower_3keyup.wav");
      await fetch("/music/snowflower_3keydown.wav");

      console.log("true received");
    });
  }

  return (
    <>
      <GameUI
        decibel={decibel}
        playersScore={playersScore}
        totalPlayers={totalPlayers}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        playersActiveItem={playersActiveItem}
        itemList={itemList}
        useItem={useItem}
        offItem={offItem}
        isLoadComplete={isLoadComplete}
        progress={progress}
      />
      <Sound
        mrKey={mrKey}
        setDecibel={setDecibel}
        setPlayersScore={setPlayersScore}
        activeItem={activeItem}
        isLoadComplete={isLoadComplete}
        setIsLoadComplete={setIsLoadComplete}
        progress={progress}
        setProgress={setProgress}
      />
    </>
  );
}
