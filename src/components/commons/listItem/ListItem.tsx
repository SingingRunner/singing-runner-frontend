import Button, { buttonType } from "../button/Button";
import * as S from "./ListItem.styles";

interface IListItemProps {
  children?: React.ReactNode;
  buttonText?: string; // 버튼이 필요한 경우에만 추가
  buttonType?: buttonType; // 버튼이 필요한 경우에만 추가
  onClick?: () => void;
}
export default function ListItem(props: IListItemProps) {
  return (
    <S.Wrapper>
      <div>{props.children && props.children}</div>
      {props.buttonType && (
        <Button
          text={props.buttonText}
          buttonType={props.buttonType}
          onClick={props.onClick}
          height="30px"
        />
      )}
    </S.Wrapper>
  );
}
