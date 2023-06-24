import * as S from "./Input.styles";

interface IInputProps {
  inputType: inputType;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  value?: string;
  searchIcon?: boolean;
}

export enum inputType {
  "BASIC",
  "SEARCH",
}

export default function Input(props: IInputProps) {
  return (
    <S.Wrapper>
      <S.Input
        inputType={props.inputType}
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.searchIcon && <S.SearchIcon src="/icon/search-purple.png" />}
    </S.Wrapper>
  );
}
