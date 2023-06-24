import { useRouter } from "next/router";
import * as S from "./LoginHeader.styles";

export default function LoginHeader() {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };
  return (
    <S.ImageWrapper>
      <S.BackButton
        onClick={goBack}
        src="/icon/arrow.png"
        alt="vector"
      />
      <S.ImageLogo
        style={{ width: "200px" }}
        src="/images/game_logo.png"
        alt="logo"
      />
      <S.Invisible/>
    </S.ImageWrapper>
  );
}
