import { useEffect, useState } from "react";
import GameUI from "./Game.presenter";
import Sound from "./sound/Sound";

const INIT_ITEM_EFFECT = {
  mute: false,
  frozen: false,
  cloud: false,
  keyDown: false,
  keyUp: false,
  shield: false,
};

export default function Game() {
  // 테스트
  useEffect(() => {
    onItem("keyUp");
    // onItem("keyDown");
    // onItem("mute");
    // onItem("frozen");
    getItem("mute");
    getItem("frozen");
    getItem("keyUp");
    // getItem("keyDown");
  }, []);

  // ⭐️ 총 플레이어 수
  const totalPlayers = 3;
  // 🚨 모든 유저의 점수를 관리하는 상태
  const [playersScore, setPlayersScore] = useState([0, 100, 0]);
  // ⭐️ 현재의 mrKey를 저장하는 상태
  const [mrKey, setMrKey] = useState("origin");
  // mute 아이템 발동 시 측정한 데시벨의 상태
  const [decibel, setDecibel] = useState(0);
  // mute 공격을 당한 경우, 데시벨 측정 시작을 위한 상태
  const [isMuteActive, setIsMuteActive] = useState(false);

  // 현재 유저에게 활성화된 아이템을 관리하는 상태
  const [activeItem, setActiveItem] = useState({
    mute: false,
    frozen: false,
    cloud: false,
    keyDown: false,
    keyUp: false,
    shield: false,
  });

  // 모든 유저들의 활성화된 아이템을 프로필 옆에 나타내기 위해 저장하는 상태 (["나", "오른쪽", "왼쪽"])
  // 마지막에 활성화된 아이템 하나만 저장
  const [playersActiveItem, setPlayersActiveItem] = useState(["", "", ""]);

  /** 유저들의 활성화된 아이템을 변경하는 함수 */
  // 🚨 다른 유저들에게 공격이 들어오면 호출
  const changePlayersActiveItem = (playerIndex: number, item: string) => {
    setPlayersActiveItem((prev) => {
      const temp = [...prev];
      temp[playerIndex] = item;
      return temp;
    });
  };

  /** 아이템 효과를 시작하는 함수 */
  // 🚨현재 유저에게 아이템 공격이 들어오면 호출
  const onItem = (item: string) => {
    setActiveItem({
      ...INIT_ITEM_EFFECT, // 나머지 효과 모두 종료
      [item]: true,
    });

    // ⭐️ 통신 되면 필요 없을 듯
    changePlayersActiveItem(0, item);

    if (item === "keyUp") {
      setMrKey("keyUp");
    } else if (item === "keyDown") {
      setMrKey("keyDown");
    } else if (item === "mute") {
      setIsMuteActive(true);
    }

    // frozen 아이템은 유저가 직접 종료
    if (item === "frozen") return;

    // 나머지 아이템은 5초 뒤에 자동 종료
    setTimeout(() => offItem(item), 4500);
  };

  /** 데시벨을 측정하는 함수 */
  const checkDecibel = () => {
    console.log("decibel", decibel);
    if (isMuteActive && decibel > -60) offItem("mute");
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

    // 🚨 아이템 공격이 종료됐다고 서버에 알리기
  };

  // 가지고 있는 아이템 목록
  const [itemList, setItemList] = useState([""]);

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
    /* 🚨 아이템 사용 API 요청하기 */

    setItemList((prev) => {
      return prev.filter((i) => i !== item); // itemList에서 해당 아이템을 제외한 나머지만 반환
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "black", color: "white", width: "80px" }}>
        {`${playersScore[0]}, `}
        {`${playersScore[1]}, `}
        {playersScore[2]}
      </div>
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
      />
      <Sound
        mrKey={mrKey}
        setDecibel={setDecibel}
        setPlayersScore={setPlayersScore}
        activeItem={activeItem}
      />
    </>
  );
}
