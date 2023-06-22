import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import * as S from "../main/Main.styles";
import { IInitialUIProps } from "./initial.types";

export default function InitialUI(props: IInitialUIProps) {
  return (
    <>
      <div
        style={{
          // width: "100vw",
          height: "88vh",
          backgroundColor: "#1A1128",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginTop: "20vh" }}>
          <S.ImageWrapper>
            <S.ImageLogo src="/images/game_logo.png" alt="logo" />
          </S.ImageWrapper>
        </div>
      </div>
        <ButtonWrapper>
          <Button
            buttonType={buttonType.GRADATION}
            text="로그인"
            onClick={props.handleLoginClick}
          />
          <Button
            buttonType={buttonType.EMPTY}
            text="회원가입"
            onClick={props.handleSignupClick}
          />
        </ButtonWrapper>
    </>
  );
}
