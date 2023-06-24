import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";
import Button, { buttonType } from "../../../commons/button/Button";

export default function AfterClickBattle(props: IMainUIProps) {
  return (
    <>
      <Button buttonType={buttonType.ONECOLOR} isFixedAtBottomSecond>
        <S.Timer>{props.formatTime(props.timer)}</S.Timer>
        게임 찾는 중...
      </Button>
      <Button
        buttonType={buttonType.EMPTY}
        text="매칭 취소"
        isFixedAtBottom
        onClick={props.handleMatchCancel}
      />
    </>
  );
}
