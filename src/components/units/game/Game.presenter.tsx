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
      </S.Wrapper>
    </>
  );
}
