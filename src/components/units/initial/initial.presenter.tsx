import * as S from "./initial.styles";
import { IInitialUIProps } from "./initial.types";
import Button, { buttonType } from "../../commons/button/Button";
import { S3_PATH } from "../../../commons/constants/Constants";

function InitialUI(props: IInitialUIProps) {
  return (
    <>
      <S.Container>
        <S.LogoWrapper>
          <S.ImageLogo src={`${S3_PATH}/images/game_logo.png`} alt="logo" />
        </S.LogoWrapper>
        <S.SocialWrapper>
          <S.KakaoLoginButton onClick={props.handleKakaoLogin}>
            <S.KakaoLogo src={`${S3_PATH}/logo/kakao.png`}></S.KakaoLogo>
            <S.KakaoText>카카오 로그인</S.KakaoText>
          </S.KakaoLoginButton>
          <S.GoogleLoginButton onClick={props.handleGoogleLogin}>
            <S.GoogleLogo src={`${S3_PATH}/logo/google.png`}></S.GoogleLogo>
            <S.GoogleText>구글 로그인</S.GoogleText>
          </S.GoogleLoginButton>
        </S.SocialWrapper>
      </S.Container>

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
