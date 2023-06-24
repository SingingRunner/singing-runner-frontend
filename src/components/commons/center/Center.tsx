import * as S from "./Center.styles";

interface ICenterProps {
  src: string;
  alt?: string;
}

export default function Center(props: ICenterProps) {
  return (
      <S.Center>
        <S.Image src={props.src} alt={props.alt} />
      </S.Center>
  );
}
