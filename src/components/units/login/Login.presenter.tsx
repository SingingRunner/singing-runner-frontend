import Button, { buttonType } from "../../commons/button/Button";
import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { ILoginUIProps } from "./Login.types";
import * as S from "./Login.styles";

export default function LoginUI(props: ILoginUIProps) {
  return (
    <>
      <S.LoginContainer>
        <LoginHeader />

        <S.LoginInputContainer>
          <S.InputWrapper>
            <Input
              inputType={inputType.BASIC}
              type="text"
              placeholder="이메일"
              value={props.email}
              onChange={props.handleEmailChange}
              onBlur={props.validateEmail}
              onKeyDown={props.onKeyDown}
            />
            <S.EmailError>{props.emailError}</S.EmailError>
          </S.InputWrapper>
          <S.InputWrapper>
            <Input
              inputType={inputType.BASIC}
              type="password"
              placeholder="비밀번호"
              value={props.password}
              onChange={props.handlePasswordChange}
              onKeyDown={props.onKeyDown}
            />
            <S.PasswordError>{props.passwordError}</S.PasswordError>
          </S.InputWrapper>
        </S.LoginInputContainer>

        <Button
          buttonType={
            props.isLoginButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="로그인"
          isFixedAtBottom
          onClick={
            props.isLoginButtonEnabled ? props.onClickLogin : props.dummyClick
          }
        />
      </S.LoginContainer>
    </>
  );
}
