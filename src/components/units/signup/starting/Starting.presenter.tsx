import Button, { buttonType } from "../../../commons/button/Button";
import ButtonWrapper from "../../../commons/buttons/wrapper";
import * as S from "./Starting.styles";
import { IStartingUIProps } from "./Starting.types";

export default function StartingUI(props: IStartingUIProps) {
  return (
    <>
      <S.Container>
        <S.ImageWrapper>
          <S.ImageVectorLeft src="/images/Vector_left.png" alt="vector" />
          <S.ImageLogo src="/images/game_logo.png" alt="logo" />
          <S.ImageVectorRight src="/images/Vector_right.png" alt="vector" />
        </S.ImageWrapper>
      </S.Container>
      <ButtonWrapper>
        <Button
          buttonType={buttonType.GRADATION}
          text="선택 완료"
          onClick={props.handleCharacterChooseClick}
        />
      </ButtonWrapper>
    </>
  );
}
