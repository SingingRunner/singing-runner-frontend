import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { ILoginUIProps } from "./Login.types";
import * as S from "./Login.styles";

export default function LoginUI(props: ILoginUIProps) {
  return (
    <>
      <S.LoginContainer>
        <S.LoginHeaderWrapper>
          <LoginHeader />
        </S.LoginHeaderWrapper>
        <S.InputWrapper>
          <Input
            inputType={inputType.LONG}
            type="text"
            placeholder="이메일"
            value={props.email}
            onChange={props.handleEmailChange}
            onBlur={props.validateEmail}
          />
          <S.EmailError>{props.emailError}</S.EmailError>
        </S.InputWrapper>
        <S.InputWrapper>
          <Input
            inputType={inputType.LONG}
            type="password"
            placeholder="비밀번호"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
          {!props.passwordError ? (
            <S.Blank />
          ) : (
            <S.PasswordError>{props.passwordError}</S.PasswordError>
          )}
        </S.InputWrapper>
      </S.LoginContainer>

      <ButtonWrapper>
        <Button
          buttonType={
            props.isLoginButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="로그인"
          onClick={
            props.isLoginButtonEnabled ? props.onClickLogin : props.dummyClick
          }
        />
      </ButtonWrapper>
    </>
  );
}
