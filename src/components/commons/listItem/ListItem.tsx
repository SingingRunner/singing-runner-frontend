import Button, { buttonType } from "../button/Button";
import * as S from "./ListItem.styles";

interface IListItemProps {
  children?: React.ReactNode;
  buttonText: string;
  buttonType: buttonType;
  onClick?: () => void;
}
export default function ListItem(props: IListItemProps) {
  return (
    <S.Wrapper>
      <div>{props.children && props.children}</div>
      <Button text={props.buttonText} buttonType={props.buttonType} />
    </S.Wrapper>
  );
}
