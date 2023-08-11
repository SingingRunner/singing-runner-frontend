import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import * as S from "./LoginHeader.styles";
import { S3_PATH } from "../../../../commons/constants/Constants";

export default function LoginHeader() {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(`${S3_PATH}/sound/effect/pop.mp3`);
  }, []);

  const goBack = () => {
    audioRef.current?.play();
    router.push("/");
  };

  return (
    <S.ImageWrapper>
      <S.BackButton
        onClick={goBack}
        src={`${S3_PATH}/icon/arrow.png`}
        alt="vector"
      />
      <S.ImageLogo
        style={{ width: "200px" }}
        src={`${S3_PATH}/images/game_logo.png`}
        alt="logo"
      />
      <S.Invisible />
    </S.ImageWrapper>
  );
}
