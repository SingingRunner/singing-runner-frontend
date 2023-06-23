import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";
import Button, { buttonType } from "../../../commons/button/Button";
import Center from "../../../commons/center/Center";

export default function AfterClickBattle(props: IMainUIProps) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1A1128",
        position: "relative",
      }}
    >
      <Center src={`/game/player/profile/${props.character}.png`} alt="character" />

      <Button 
      buttonType={buttonType.ONECOLOR} 
      isFixedAtBottomSecond>
        <S.Timer>{props.formatTime(props.timer)}</S.Timer>
        게임 찾는 중...
      </Button>
      <Button
        buttonType={buttonType.EMPTY}
        text="매칭 취소"
        isFixedAtBottom
        onClick={props.handleMatchCancel}
      />
    </div>
  );
}
