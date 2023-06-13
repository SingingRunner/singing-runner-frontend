import { useEffect, useState } from "react";

import GameUI from "./Game.presenter";

const INIT_ITEM_EFFECT = {
  mute: false,
  frozen: false,
  cloud: false,
  keyDown: false,
  keyUp: false,
  shield: false,
};

export default function Game() {
  // 🚨 총 플레이어 수
  const totalPlayers = 3;

  // 🚨 모든 유저의 점수를 관리하는 상태
  const playersScore = [0, 0, 0];

  // 현재 유저에게 활성화된 아이템을 관리하는 상태
  // 아이템 중복 허용 로직에 사용
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
    changePlayersActiveItem(0, item); // 🚨 통신 되면 필요 없을 듯
  };

  /** 아이템 효과를 종료하는 함수 */
  // 🚨현재 유저에게 적용된 아이템 공격이 종료되면 호출
  const offItem = (item: string) => {
    setActiveItem({
      ...activeItem,
      [item]: false,
    });
    changePlayersActiveItem(0, "");
  };

  // 테스트
  useEffect(() => {
    // onItem("keyUp");
    // onItem("keyDown");
    onItem("mute");
    // onItem("frozen");
    getItem("mute");
    getItem("frozen");
    getItem("keyUp");
    // getItem("keyDown");
  }, []);

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
    console.log(item, "사용했어요!");
  };

  /* 🚨 데시벨 측정하기 */
  // mute 아이템 발동 시 측정한 데시벨
  // const [decibel, setDecibel] = useState(100);
  const [decibel] = useState(100);

  return (
    <GameUI
      decibel={decibel}
      playersScore={playersScore}
      totalPlayers={totalPlayers}
      activeItem={activeItem}
      playersActiveItem={playersActiveItem}
      itemList={itemList}
      useItem={useItem}
      offItem={offItem}
      // switchPlayerToSnowman={switchPlayerToSnowman}
      // switchSnowmanToPlayer={switchSnowmanToPlayer}
      // stopPlayer={stopPlayer}
      // startPlayer={startPlayer}
      // movePlayer={movePlayer}
    />
  );
}
