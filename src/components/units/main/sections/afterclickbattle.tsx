import * as S from "../Main.styles";
import ButtonWrapper from "../../../commons/buttons/wrapper";
import { IMainUIProps } from "../Main.types";
import Button, { buttonType } from "../../../commons/button/Button";

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
      <S.ImageWrapper>
        <S.ImageCat src="/images/cat.png" alt="Cat" />
        <S.ImageMic src="/images/microphone.png" alt="Microphone" />
      </S.ImageWrapper>
      <ButtonWrapper>
        <S.MatchButton>
          <S.Timer>{props.formatTime(props.timer)}</S.Timer>
          게임 찾는 중...
        </S.MatchButton>
        <Button
          buttonType={buttonType.EMPTY}
          text="매칭 취소"
          onClick={props.handleMatchCancel}
        />
      </ButtonWrapper>
    </div>
  );
}
