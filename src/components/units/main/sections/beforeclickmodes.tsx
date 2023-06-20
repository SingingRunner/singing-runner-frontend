import * as S from "../Main.styles";
import ButtonWrapper from "../../../commons/buttons/wrapper";
import { IMainUIProps } from "../Main.types";
import Button, { buttonType } from "../../../commons/button/Button";

export default function BeforeClickModes(props: IMainUIProps) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1A1128",
        position: "relative",
      }}
    >
      <S.ImageWrapper>
        <S.ImageCat src="../images/cat.png" alt="Cat" />
        <S.ImageMic src="../images/microphone.png" alt="Microphone" />
      </S.ImageWrapper>
      {props.isClicked && ( // 1-2. START 클릭 후 모드 선택 화면
        <>
          <ButtonWrapper>
            <Button
              buttonType={buttonType.EMPTY}
              text ="배틀 모드"
              onClick={props.handleBattleModeClick}
            />
            <Button
              buttonType={buttonType.EMPTY}
              text ="커스텀 모드"
              onClick={props.handleClick}
            />
          </ButtonWrapper>
        </>
      )}

      {!props.isClicked && ( // 1-1. 처음 화면
        <ButtonWrapper>
          <Button 
          buttonType={buttonType.GRADATION}
          text="START" 
          onClick={props.handleClick}/>
        </ButtonWrapper>
      )}
    </div>
  );
}
