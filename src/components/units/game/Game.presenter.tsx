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
    setIsItemActivated(props.appliedItems.length > 0);
  }, [props.appliedItems]);

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
      {props.isLoadComplete &&
        props.playersInfo[2] &&
        props.playersInfo[1] &&
        props.playersInfo[0] && (
          // 로딩화면 끝, 게임 시작
          <>
            <Graphic
              preventEvent={props.preventEvent}
              appliedItems={props.appliedItems}
              playersInfo={props.playersInfo}
              offItem={props.offItem}
              decibel={props.decibel}
              muteAttack={props.muteAttack}
              isFrozenActive={props.isFrozenActive}
              isFrozenActiveRight={props.isFrozenActiveRight}
              isFrozenActiveLeft={props.isFrozenActiveLeft}
              isTerminated={props.isTerminated}
            />
            <S.Wrapper>
              {!props.isTerminated && isItemActivated && (
                <S.ItemEffectWrapper />
              )}
              <S.Title>
                {props.songInfo.title} - {props.songInfo.singer}
              </S.Title>
              {!props.isTerminated && (
                <Lyric
                  startTime={props.startTime}
                  isCloud={props.appliedItems.includes("cloud")}
                />
              )}
              {!props.isTerminated && (
                <ItemInfo
                  appliedItems={props.appliedItems}
                  decibel={props.decibel}
                />
              )}
              <RankList
                playersInfo={props.playersInfo}
                isTerminated={props.isTerminated}
              />
              {!props.isTerminated && (
                <ItemList preventEvent={props.preventEvent} />
              )}
            </S.Wrapper>
          </>
        )}
    </>
  );
}
