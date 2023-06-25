import Button, { buttonType } from "../../commons/button/Button";
import { IMyRoomUIProps } from "./MyRoom.types";
import * as S from "./MyRoom.styles";
import MyroomCharacters from "./characters/Characters";
import Header from "../../commons/layout/header/Header";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function MyRoomUI(props: IMyRoomUIProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sound/effect/popup.mp3");
  }, []);

  const onClickMenu = (path: string) => {
    audioRef.current?.play();
    router.push(path);
  };

  return (
    <>
      <Header text="" />
      <S.HeaderWrapper>
        <img
          src="/icon/header/setting.png"
          onClick={() => onClickMenu("/myroom/setting")}
        />
      </S.HeaderWrapper>

      <S.Wrapper>
        <S.ProfileWrapper>
          {props.character ? (
            <S.Profile src={`/game/player/profile/${props.character}.png`} />
          ) : (
            <S.PlaceholderProfile />
          )}
          <S.Nickname>{props.userData?.nickname}</S.Nickname>
        </S.ProfileWrapper>

        <S.TierWrapper>
          {props.mmr ? <S.Mmr>{props.mmr}</S.Mmr> : <S.PlaceholderMmr />}
          {/* <S.Mmr>{props.mmr}</S.Mmr> */}
          <S.Tier>
            <S.LetterTier tier={props.tier}>{props.tier}</S.LetterTier>
            {props.tier ? (
              <S.IconTier src={`/tier/${props.tier}.png`} />
            ) : (
              <S.PlaceholderIconTier />
            )}
          </S.Tier>
        </S.TierWrapper>
      </S.Wrapper>

      <S.Container>
        <S.ImageWrapper>
          <S.ImageVectorLeft
            src="/icon/arrow.png"
            alt="previous"
            onClick={props.handlePreviousImage}
          />
          {props.currentImageIndex !== -1 && (
            <MyroomCharacters
              character={props.characters[props.currentImageIndex]}
            />
          )}
          <S.ImageVectorRight
            src="/icon/arrow.png"
            alt="next"
            onClick={props.handleNextImage}
          />
        </S.ImageWrapper>
      </S.Container>

      <Button
        buttonType={buttonType.EMPTY}
        text="선택 완료"
        isFixedAtBottom
        onClick={props.onClickComplete}
      />
    </>
  );
}
