import * as S from "./Input.styles";

interface IInputProps {
  inputType: inputType;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  value?: string;
}

export enum inputType {
  "MEDIUM",
  "LONG",
}

export default function Input(props: IInputProps) {
  return <S.Input 
  inputType={props.inputType}
  type={props.type}
  placeholder={props.placeholder}
  value={props.value}
  onChange={props.onChange}
  onBlur={props.onBlur}
  />
}
