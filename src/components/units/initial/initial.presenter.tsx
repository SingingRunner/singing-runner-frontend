import Button, { buttonType } from "../../commons/button/Button";
import * as S from "../main/Main.styles";
import { IInitialUIProps } from './Initial.types';

export default function InitialUI(props: IInitialUIProps) {
  return (
    <>
      <div
        style={{
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
      <Button
        buttonType={buttonType.GRADATION}
        text="로그인"
        isFixedAtBottomSecond
        onClick={props.handleLoginClick}
      />
      <Button
        buttonType={buttonType.EMPTY}
        text="회원가입"
        isFixedAtBottom
        onClick={props.handleSignupClick}
      />
    </>
  );
}
