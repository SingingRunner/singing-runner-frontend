import styled from "@emotion/styled";
import { buttonType } from "./Button";
interface IButtonProps {
  isFixedAtBottomSecond: boolean | undefined;
  isFixedAtBottom: boolean | undefined;
  buttonType: buttonType;
}
export const Button = styled.button`
  width: 100%;
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
  ${(props: IButtonProps) => {
    return props.isFixedAtBottomSecond
      ? `
    position: fixed;
    bottom: 56px;
    width: calc(100% - 32px);
    `
      : ``;
  }}
  ${(props: IButtonProps) => {
    return props.isFixedAtBottom
      ? `
    position: fixed;
    bottom: 0;
    width: calc(100% - 32px);
    `
      : ``;
  }}
  ${(props: IButtonProps) => {
    switch (props.buttonType) {
      case buttonType.GRADATION:
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
      case buttonType.SELECT:
        return `
        border: 2px solid #BD00FE;
        box-shadow: inset 0px 0px 10px 1.5px #BD00FE, 0px 0px 10px 1.5px #BD00FE;
        background: #BD00FE;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        `;
      case buttonType.SEARCH:
        return `
        border: 2px solid #BD00FE;
        box-shadow: inset 0px 0px 10px 1.5px #BD00FE, 0px 0px 10px 1.5px #BD00FE;
        background: #BD00FE;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        `;
      case buttonType.DISABLED:
        return `
        border: 2px solid #E2E2E2;
        background: transparent;
        `;
      case buttonType.SHORT:
        return `
        border: 2px solid #BD00FE;
        box-shadow: inset 0px 0px 10px 1.5px #BD00FE, 0px 0px 10px 1.5px #BD00FE;
        background: #BD00FE;
        min-width: 92px;
        max-width: 92px;
        height: 30px;
        font-size: 14px;
        margin: 0 0 0 12px;
        `;
      case buttonType.SHORT_PINK:
        return `
        border: 2px solid #FE259B;
        background: #FE259B;
        box-shadow: 0px 0px 10px #FE259B;
        min-width: 92px;
        max-width: 92px;
        height: 30px;
        font-size: 14px;
        margin: 0 0 0 12px;
        `;
      case buttonType.SHORT_DISABLED:
        return `
        border: 2px solid #C7C7C7;
        background: transparent;
        min-width: 92px;
        max-width: 92px;
        height: 30px;
        font-size: 14px;
        color: #C7C7C7;
        margin: 0 0 0 12px;
        `;
      case buttonType.FILTER:
        return `
        padding: 0 16px;
        display: flex;
        height: 30px;
        justify-content: space-between;
        border: 2px solid #DFF45B;
        background: #DFF45B;
        box-shadow: 0px 0px 10px 0px #DFF45B;
        color: #000000;
        `;
    }
  }}
`;

interface ISelectIconProps {
  isRight?: boolean;
  small?: boolean;
}

export const SelectIcon = styled.img`
  height: ${(props: ISelectIconProps) => (props.small ? "12px" : "16px")};
  rotate: ${(props: ISelectIconProps) => props.isRight && "180deg"};
`;
export const SearchIcon = styled.img`
  height: 20px;
`;
export const Empty = styled.div`
  width: 20px;
`;
