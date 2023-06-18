import Button, { buttonType } from "../../../commons/button/Button";
import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";

export default function BeforeLogin(props: IMainUIProps) {
  return (
    <div
      style={{
        // width: "100vw",
        height: "75vh",
        backgroundColor: "#1A1128",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginTop: "160px", marginBottom: "40px" }}>
        <S.ImageWrapper>
          <S.ImageLogo src="../images/game_logo.png" alt="logo" />
        </S.ImageWrapper>
      </div>
        <div style={{ marginTop: "auto", marginBottom: "40px", color: "#FFFFFF" }}>로그인 전 화면!!!(임시)</div>
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
    </div>
  );
}
