// import * as S from "../../../commons/layout/Layout.styles";
import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";

export default function LoadingMain(props: IMainUIProps) {
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
        <S.ImageLogo style={{marginTop: 70}} src="../images/game_logo.png" alt="logo" />
      </S.ImageWrapper>
      <div style={{ color: "#FFFFFF" }}>로딩화면!!!(임시)</div>
    </div>
  );
}
