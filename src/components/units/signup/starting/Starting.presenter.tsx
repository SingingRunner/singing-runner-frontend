import Button, { buttonType } from "../../../commons/button/Button";
import * as S from "./Starting.styles";
import { IStartingUIProps } from "./Starting.types";

export default function StartingUI(props: IStartingUIProps) {
  return (
    <>
      <S.Container>
        <S.ImageWrapper>
          <S.ImageVectorLeft src="/icon/arrow.png" alt="previous" onClick={props.handlePreviousImage}/>
          <S.ImageCharacter src={`/game/player/profile/${props.characters[props.currentImageIndex]}.png`} alt="character" />
          <S.ImageVectorRight src="/icon/arrow.png" alt="next" onClick={props.handleNextImage}/>
        </S.ImageWrapper>
      </S.Container>
      <Button
        buttonType={buttonType.GRADATION}
        text="선택 완료"
        isFixedAtBottom
        onClick={props.onClickComplete}
      />
    </>
  );
}
