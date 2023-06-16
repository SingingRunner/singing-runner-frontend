import * as S from "./Button.styles";
interface IButtonProps {
  buttonType: buttonType;
  text: string;
  onClick?: () => void;
}
export enum buttonType {
  "GRADATAION",
  "EMPTY",
  "DISABLED",
  "ONECOLOR",
  "SEARCH",
  "SELECT",
  "SHORT",
  "SHORT_PINK",
  "SHORT_DISABLED",
}

export default function Button(props: IButtonProps) {
  return (
    <S.Button onClick={props.onClick} buttonType={props.buttonType}>
      {props.text}
    </S.Button>
  );
}
