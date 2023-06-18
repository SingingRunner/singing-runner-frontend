import * as S from "./Button.styles";
interface IButtonProps {
  buttonType: buttonType;
  text: string;
  onClick?: () => void;
  isFixedAtBottom?: boolean; // 화면의 맨 밑에 붙어있는 버튼
  isFixedAtBottomSecond?: boolean; // 화면의 맨 밑에 있는 버튼 바로 위의 버튼
}
export enum buttonType {
  "GRADAION",
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
    <S.Button
      onClick={props.onClick}
      buttonType={props.buttonType}
      isFixedAtBottom={props.isFixedAtBottom}
      isFixedAtBottomSecond={props.isFixedAtBottomSecond}
    >
      {props.text}
    </S.Button>
  );
}
