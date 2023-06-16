import styled from "@emotion/styled";
import { buttonType } from "./Button";

export const Button = styled.button`
  width: calc(100% - 32px);
  height: 40px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  ${(props: { buttonType: buttonType }) => {
    switch (props.buttonType) {
      case buttonType.GRADATAION:
        return `
        background: linear-gradient(90deg, #8b50f2 0%, #bd00fe 100%);
        box-shadow: 0px 0px 10px #bd00fe;
        `;
      case buttonType.EMPTY:
        return `
        border: 2px solid #BD00FE;
        box-shadow: inset 0px 0px 10px 1.5px #BD00FE, 0px 0px 10px 1.5px #BD00FE;
        background-color: transparent;
          &:hover {
            background: #BD00FE;
          }
        `;
      case buttonType.ONECOLOR:
        return `
        border: 2px solid #BD00FE;
        box-shadow: inset 0px 0px 10px 1.5px #BD00FE, 0px 0px 10px 1.5px #BD00FE;
        background: #BD00FE;
        `;
      case buttonType.SHORT:
        return `
        border: 2px solid #BD00FE;
        box-shadow: inset 0px 0px 10px 1.5px #BD00FE, 0px 0px 10px 1.5px #BD00FE;
        background: #BD00FE;
        width: 92px;
        font-size: 14px;
        `;
      case buttonType.SHORT_PINK:
        return `
        border: 2px solid #FE259B;
        background: #FE259B;
        box-shadow: 0px 0px 10px #FE259B;
        width: 92px;
        font-size: 14px;
        `;
      case buttonType.SHORT_DISABLED:
        return `
        border: 2px solid #C7C7C7;
        background: transparent;
        width: 92px;
        font-size: 14px;
        color: #C7C7C7;
        `;
    }
  }}
`;
