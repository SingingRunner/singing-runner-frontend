import styled from "@emotion/styled";
import { inputType } from "./Input";

interface IInputProps {
  inputType: inputType;
}
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Input = styled.input`
  height: 40px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  padding-left: 20px;
  width: 100%;
  ::placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: #bd00fe;
  }
  ${(props: IInputProps) => {
    switch (props.inputType) {
      case inputType.BASIC:
        return `
        `;
      case inputType.SEARCH:
        return `
        padding-left: 40px;
        `;
    }
  }}
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 28px;
  width: 20px;
  height: 20px;
`;
