import Button, { buttonType } from "../../commons/button/Button";
import { IMyRoomUIProps } from "./MyRoom.types";
import * as S from "./MyRoom.styles";

export default function MyRoomUI(props: IMyRoomUIProps) {
  return (
    <>
      <S.Setting onClick={props.onClickSetting} src="/icon/setting.png" />

      <S.Wrapper>
        <S.ProfileWrapper>
          <S.Profile src={`/game/player/profile/${props.character}.png`} />
          <S.Nickname>{props.userData?.nickname}</S.Nickname>
        </S.ProfileWrapper>

        <S.TierWrapper>
          <S.Mmr>{props.mmr}</S.Mmr>
          <S.Tier>
            <S.LetterTier 
              tier={props.tier}
            >{props.tier}</S.LetterTier>
            <S.IconTier src={`/tier/${props.tier}.png`} />
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
          <S.ImageCharacter
            src={`/game/player/profile/${
              props.characters[props.currentImageIndex]
            }.png`}
            alt="character"
          />
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
