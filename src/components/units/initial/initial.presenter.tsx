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
        <S.SocialWrapper>
          <S.KakaoIcon
            src="/button/kakao_login.png"
            onClick={props.handleKakaoLogin}
          ></S.KakaoIcon>
          <S.GoogleIcon
            src="/button/google_login.png"
            onClick={props.handleGoogleLogin}
          ></S.GoogleIcon>
        </S.SocialWrapper>
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
