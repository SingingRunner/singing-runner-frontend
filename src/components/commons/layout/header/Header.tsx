import { useRouter } from "next/router";
import * as S from "./Header.styles";

interface IHeaderProps {
  text: string;
  onClickPrev?: () => void;
}
export default function Header(props: IHeaderProps) {
  const router = useRouter();
  const onClickPrevBtn = () => {
    if (props.onClickPrev) {
      props.onClickPrev();
      return;
    }
    router.back();
  };

  return (
    <S.Wrapper>
      <img onClick={onClickPrevBtn} src="/icon/prev.png" />
      <span>{props.text}</span>
      <span style={{ width: "30px" }} />
    </S.Wrapper>
  );
}
