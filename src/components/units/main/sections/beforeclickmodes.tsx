import { IMainUIProps } from "../Main.types";
import Button, { buttonType } from "../../../commons/button/Button";

export default function BeforeClickModes(props: IMainUIProps) {
  return (
    <>
      {props.isClicked && ( // 1-2. START 클릭 후 모드 선택 화면
        <>
          <Button
            buttonType={buttonType.EMPTY}
            text="랭크 모드"
            isFixedAtBottomSecond
            onClick={props.handleBattleModeClick}
          />
          <Button
            buttonType={buttonType.EMPTY}
            text="커스텀 모드"
            isFixedAtBottom
            onClick={props.onClickCustomMode}
          />
        </>
      )}

      {!props.isClicked && ( // 1-1. 처음 화면
        <Button
          buttonType={buttonType.GRADATION}
          text="START"
          isFixedAtBottom
          onClick={props.handleClick}
        />
      )}
    </>
  );
}
