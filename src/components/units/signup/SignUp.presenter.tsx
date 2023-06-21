import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { ISignUpUIProps } from "./SignUp.types";
import * as S from "./SignUp.styles";

export default function SignUpUI(props: ISignUpUIProps) {
  return (
    <>
      <S.SignUpContainer>
        <S.SignUpHeaderWrapper>
          <LoginHeader />
        </S.SignUpHeaderWrapper>
        <S.InputButtonWrapper>
          <S.InputErrorWrapper>
            <Input
              inputType={inputType.MEDIUM}
              type="text"
              placeholder="이메일"
              value={props.email}
              onChange={props.handleEmailChange}
              onBlur={props.validateEmail}
            />
            {!props.emailError ? (
              <S.BlankShort />
            ) : (
              <S.Error>{props.emailError}</S.Error>
            )}
          </S.InputErrorWrapper>
          <Button
            buttonType={buttonType.SHORT}
            text="중복 확인"
            onClick={props.checkDuplicateEmail}
          />
        </S.InputButtonWrapper>
        <S.PasswordWrapper>
          <Input
            inputType={inputType.LONG}
            type="password"
            placeholder="비밀번호"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
          {!props.passwordError ? (
            <S.BlankShort />
          ) : (
            <S.Error>{props.passwordError}</S.Error>
          )}
        </S.PasswordWrapper>
        <S.PasswordWrapper>
          <Input
            inputType={inputType.LONG}
            type="password"
            placeholder="비밀번호 확인"
            value={props.passwordCheck}
            onChange={props.handlePasswordCheckChange}
          />
          {!props.passwordCheckError ? (
            <S.BlankShort />
          ) : (
            <S.Error>{props.passwordCheckError}</S.Error>
          )}
        </S.PasswordWrapper>
        <S.InputButtonWrapper>
          <S.InputErrorWrapper>
            <Input
              inputType={inputType.MEDIUM}
              type="text"
              placeholder="닉네임"
              value={props.nickname}
              onChange={props.handleNicknameChange}
            />
            {!props.nicknameError ? (
              <S.BlankLong />
            ) : (
              <S.ErrorNickname>{props.nicknameError}</S.ErrorNickname>
            )}
          </S.InputErrorWrapper>
          <Button
            buttonType={buttonType.SHORT}
            text="중복 확인"
            onClick={props.dummyClick}
          />
        </S.InputButtonWrapper>
      </S.SignUpContainer>
      <ButtonWrapper>
        <Button
          buttonType={
            props.isSignUpButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="가입 완료"
          onClick={
            props.isSignUpButtonEnabled ? props.onClickSignUp : props.dummyClick
          }
        />
      </ButtonWrapper>
    </>
  );
}
