import Button, { buttonType } from "../../../commons/button/Button";
import * as S from "./Starting.styles";
import { IStartingUIProps } from "./Starting.types";

export default function StartingUI(props: IStartingUIProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
        }}
      >
        캐릭터를 선택해주세요.
      </div>
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
        buttonType={buttonType.GRADATION}
        text="선택 완료"
        isFixedAtBottom
        onClick={props.onClickComplete}
      />
    </>
  );
}
