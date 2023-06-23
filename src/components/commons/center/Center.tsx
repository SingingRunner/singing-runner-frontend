import * as S from "./Center.styles";

interface ICenterProps {
  src: string;
  alt?: string;
}

export default function Center(props: ICenterProps) {
  return (
    <S.Wrapper>
      <S.Center>
        <img src={props.src} alt={props.alt} />
      </S.Center>
    </S.Wrapper>
  );
}
