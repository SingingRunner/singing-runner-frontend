import { useRouter } from "next/router";
import * as S from "./LoginHeader.styles";

export default function LoginHeader() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <S.ImageWrapper>
      <S.ImageVectorLeft
        onClick={goBack}
        src="/images/Vector_left.png"
        alt="vector"
      />
      <S.ImageLogo
        style={{ width: "200px" }}
        src="/images/game_logo.png"
        alt="logo"
      />
    </S.ImageWrapper>
  );
}
