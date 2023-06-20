import * as S from "./LoginHeader.styles";

export default function LoginHeader() {
  return (
    <S.ImageWrapper>
      <S.ImageVectorLeft src="../images/Vector_left.png" alt="vector" />
      <S.ImageLogo
        style={{ width: "200px" }}
        src="../images/game_logo.png"
        alt="logo"
      />
    </S.ImageWrapper>
  );
}
