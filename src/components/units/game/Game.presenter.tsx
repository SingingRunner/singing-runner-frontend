import * as S from "./Game.styles";
import { IGameUIProps } from "./Game.types";
import ItemList from "./itemList/ItemList";
import RankList from "./rankList/rankList";
import ItemInfo from "./itemInfo/ItemInfo";
import Lyric from "./lyric/Lyric";
import Graphic from "./graphic/Graphic";
import { useEffect, useState } from "react";

export default function GameUI(props: IGameUIProps) {
  // 아이템이 활성화 되어 있을 때, 화면 테두리 애니메이션을 보여주기 위한 상태
  const [isItemActivated, setIsItemActivated] = useState(false);
  useEffect(() => {
    setIsItemActivated(Object.values(props.activeItem).some((value) => value));
  }, [props.activeItem]);

  return (
    <>
      <Graphic
        playersScore={props.playersScore}
        totalPlayers={props.totalPlayers}
        activeItem={props.activeItem}
        playersActiveItem={props.playersActiveItem}
        offItem={props.offItem}
        decibel={props.decibel}
      />
      <S.Wrapper>
        {isItemActivated && <S.ItemEffectWrapper />}
        {/* 🚨 제목 - 가수 */}
        <S.Title>나는 나비 - 윤도현 밴드</S.Title>
        <Lyric />
        <ItemInfo activeItem={props.activeItem} decibel={props.decibel} />
        <RankList playersActiveItem={props.playersActiveItem} />
        <ItemList itemList={props.itemList} useItem={props.useItem} />
        {0 && (
          <S.TestButtonWrapper>
            {/* 눈사람 아이템: 화면 두드려야 탈출 가능 */}
            <button onClick={() => props.switchPlayerToSnowman(2)}>
              눈사람으로
            </button>
            <button onClick={() => props.switchPlayerToSnowman(1)}>
              눈사람으로
            </button>
            <button onClick={() => props.switchPlayerToSnowman(0)}>
              눈사람으로
            </button>
            <br />

            <button onClick={() => props.switchSnowmanToPlayer(2)}>
              고양이로
            </button>
            <button onClick={() => props.switchSnowmanToPlayer(1)}>
              고양이로
            </button>
            <button onClick={() => props.switchSnowmanToPlayer(0)}>
              고양이로
            </button>
            <br />

            {/* 음소거 아이템: 소리 질러야 탈출 가능 */}
            <button onClick={() => props.stopPlayer(2)}>왼쪽 멈춰</button>
            <button onClick={() => props.startPlayer(2)}>왼쪽 달려</button>
            <br />

            <button onClick={() => props.stopPlayer(0)}>가운데 멈춰</button>
            <button onClick={() => props.startPlayer(0)}>가운데 달려</button>
            <br />

            <button onClick={() => props.stopPlayer(1)}>오른쪽 멈춰</button>
            <button onClick={() => props.startPlayer(1)}>오른쪽 달려</button>
            <br />

            {/* 실시간 채점 */}
            <button onClick={() => props.movePlayer(2, "forward")}>
              왼쪽 빠르게
            </button>
            <button onClick={() => props.movePlayer(2, "backward")}>
              왼쪽 느리게
            </button>
            <br />

            <button onClick={() => props.movePlayer(0, "forward")}>
              가운데 빠르게
            </button>
            <button onClick={() => props.movePlayer(0, "backward")}>
              가운데 느리게
            </button>

            <button onClick={() => props.movePlayer(1, "forward")}>
              오른쪽 빠르게
            </button>
            <button onClick={() => props.movePlayer(1, "backward")}>
              오른쪽 느리게
            </button>
            <br />
          </S.TestButtonWrapper>
        )}
      </S.Wrapper>
    </>
  );
}
