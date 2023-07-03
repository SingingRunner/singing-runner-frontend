// components/InitialUI.tsx

import * as S from "./initial.styles";
import { IInitialUIProps } from "./initial.types";
import Button, { buttonType } from "../../commons/button/Button";

function InitialUI(props: IInitialUIProps) {
  return (
    <>
      <S.container>
        <S.LogoWrapper>
          <S.ImageLogo src="/images/game_logo.png" alt="logo" />
        </S.LogoWrapper>
        <div style={{ display: "flex", position: "fixed", bottom: "124px" }}>
          <img
            src="/button/kakao_login.png"
            style={{
              width: "60px",
              height: "auto",
              marginRight: "20px",
            }}
            onClick={props.handleKakaoLogin}
            alt="Kakao login"
          ></img>

          <button onClick={props.handleGoogleLogin}>구글 로그인</button>
        </div>
      </S.container>
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

export default InitialUI;
