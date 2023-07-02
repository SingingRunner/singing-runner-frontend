import Button, { buttonType } from "../../commons/button/Button";
import * as S from "../main/Main.styles";
import { IInitialUIProps } from "./initial.types";

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
        <div>

        <img
          src="/button/kakao_login_large.png"
          style={{
            width: "120px",
            height: "auto",
            marginRight: "20px",
          }}
          onClick={props.handleKakaoLogin}
        >
        </img>
        <button
          style={{
            height: "40px",
            width: "120px",
            backgroundColor: "white",
            marginBottom: "20vh",
          }}
          >
          구글 로그인
        </button>
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
        onClick={props.handleSignUpClick}
      />
    </>
  );
}
