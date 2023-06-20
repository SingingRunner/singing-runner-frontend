import styled from "@emotion/styled";
import { inputType } from './Input';

interface IInputProps {
  inputType: inputType;
}

export const Input = styled.input`
  height: 40px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  padding-left: 20px;
  &:focus {
    outline: none;
    border-color: #bd00fe;
  }
  ${(props: IInputProps) => {
    switch (props.inputType) {
      case inputType.MEDIUM:
        return `
        `;
      case inputType.LONG:
        return `
        width: 100%;
        `;
    }
  }}
`;
