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
      {!props.isLoadComplete && ( // 로딩 화면
        <>
          <S.LoadingBackground>
            <S.LoadingMessage>잠시만 기다려주세요.</S.LoadingMessage>
            <S.LoadingBarWrapper>
              Loading...
              <S.LoadingBar>
                <S.LoadingGauge
                  style={{
                    width: `${Number(props.progress)}%`,
                  }}
                />
              </S.LoadingBar>
            </S.LoadingBarWrapper>
            <S.MatchButtonWrapper></S.MatchButtonWrapper>
          </S.LoadingBackground>
        </>
      )}
      {props.isLoadComplete && (
        // 로딩화면 끝, 게임 시작
        <>
          <Graphic
            playersInfo={props.playersInfo}
            activeItem={props.activeItem}
            setActiveItem={props.setActiveItem}
            playersActiveItem={props.playersActiveItem}
            offItem={props.offItem}
            decibel={props.decibel}
          />
          <S.Wrapper>
            {isItemActivated && <S.ItemEffectWrapper />}
            {/* 🚨 제목 - 가수 */}
            <S.Title>
              {props.songInfo.title} - {props.songInfo.singer}
            </S.Title>
            <Lyric startTime={props.startTime} />
            <ItemInfo activeItem={props.activeItem} decibel={props.decibel} />
            <RankList
              playersInfo={props.playersInfo}
              playersActiveItem={props.playersActiveItem}
            />
            <ItemList />
          </S.Wrapper>
        </>
      )}
    </>
  );
}
