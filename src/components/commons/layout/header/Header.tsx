import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import * as S from "./Header.styles";
import { S3_PATH } from "../../../../commons/constants/Constants";

interface IHeaderProps {
  text?: string;
  onClickPrev?: () => void;
  noPrev?: boolean;
}
export default function Header(props: IHeaderProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(`${S3_PATH}/sound/effect/pop.mp3`);
    audioRef.current = audio;
  }, []);

  const onClickPrevBtn = () => {
    if (props.onClickPrev) {
      props.onClickPrev();
      audioRef.current?.play();
      return;
    }
    audioRef.current?.play();
    router.back();
  };

  return (
    <S.Wrapper alignCenter={!props.noPrev}>
      {!props.noPrev && (
        <img onClick={onClickPrevBtn} src={`${S3_PATH}/icon/prev.png`} />
      )}
      <span>{props.text}</span>
      {!props.noPrev && <span style={{ width: "30px" }} />}
    </S.Wrapper>
  );
}
