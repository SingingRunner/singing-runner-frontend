import Button, { buttonType } from "../button/Button";
import * as S from "./ListItem.styles";

interface IListItemProps {
  children?: React.ReactNode;
  rightChildren?: React.ReactNode; // 버튼 대신 오른쪽에 뭔가를 넣고 싶을 때
  buttonText?: string; // 버튼이 필요한 경우에만 추가
  buttonType?: buttonType; // 버튼이 필요한 경우에만 추가
  onClick?: () => void;
}
export default function ListItem(props: IListItemProps) {
  return (
    <S.Wrapper>
      <div>{props.children && props.children}</div>
      {props.buttonType ? (
        <Button
          text={props.buttonText}
          buttonType={props.buttonType}
          onClick={props.onClick}
          height="30px"
        />
      ) : (
        <div>{props.rightChildren && props.rightChildren}</div>
      )}
    </S.Wrapper>
  );
}
