import { memo, useEffect, useState } from "react";
import * as S from "./ItemInfo.styles";
import { IItemInfoProps } from "./ItemInfo.types";
import { S3_PATH } from "../../../../commons/constants/Constants";

const itemInfos = [
  {
    name: "super",
    msg: "강력해집니다!",
    imgSrc: `${S3_PATH}/game/item/effect/super.png`,
  },
  {
    name: "cloud",
    msg: "먹구름을 움직여서 가사를 확인하세요!",
    imgSrc: `${S3_PATH}/game/item/effect/cloud.png`,
  },
  {
    name: "frozen",
    msg: "눈사람을 두드려서 탈출하세요!",
    imgSrc: `${S3_PATH}/game/item/effect/frozen.png`,
  },
  {
    name: "keyUp",
    msg: "3키 올려서 노래해주세요!",
    imgSrc: `${S3_PATH}/game/item/effect/keyUp.png`,
  },
  {
    name: "keyDown",
    msg: "3키 낮춰서 노래해주세요!",
    imgSrc: `${S3_PATH}/game/item/effect/keyDown.png`,
  },
  {
    name: "mute",
    msg: "소리를 질러서 탈출하세요!",
    imgSrc: `${S3_PATH}/game/item/effect/mute.png`,
    showDecibelBar: true,
  },
];

function ItemInfo(props: IItemInfoProps) {
  const [lastAppliedItem, setLastAppliedItem] = useState<string>("");
  useEffect(() => {
    setLastAppliedItem(props.appliedItems[props.appliedItems.length - 1]);
  }, [props.appliedItems]);

  return (
    <>
      {itemInfos.map((el, i) => {
        if (lastAppliedItem === el.name) {
          return (
            <>
              <S.ItemInfoWrapper key={i}>
                <S.Msg>{el.msg}</S.Msg>
                <S.ItemInfoIcon src={el.imgSrc} />
                {/* 음소거 공격을 당한 경우 */}
                {el.showDecibelBar && (
                  <S.DecibelBar decibelPercent={(props.decibel + 92) * 5}>
                    <div className="meter">
                      <div className="bar" id="bar1"></div>
                      <div className="bar" id="bar2"></div>
                      <div className="bar" id="bar3"></div>
                      <div className="bar" id="bar4"></div>
                      <div className="bar" id="bar5"></div>
                    </div>
                  </S.DecibelBar>
                )}
              </S.ItemInfoWrapper>
            </>
          );
        }
        return <div key={i}></div>;
      })}
    </>
  );
}
export default memo(ItemInfo);
