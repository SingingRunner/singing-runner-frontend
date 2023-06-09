import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { ISignUpUIProps } from "./SignUp.types";
import * as S from "./SignUp.styles";
import Button, { buttonType } from "../../commons/button/Button";

export default function SignUpUI(props: ISignUpUIProps) {
  return (
    <>
      <S.SignUpContainer>
        <LoginHeader />

        <S.SignUpInputContainer>
          <S.InputButtonWrapper>
            <S.InputErrorWrapper>
              <Input
                inputType={inputType.BASIC}
                type="text"
                placeholder="이메일"
                value={props.email}
                onChange={props.handleEmailChange}
                onBlur={props.validateEmail}
                onKeyDown={props.onKeyDown}
              />
              {props.emailError ? (
                <S.Error>{props.emailError}</S.Error>
              ) : (
                <S.Success>{props.emailMessage}</S.Success>
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
              inputType={inputType.BASIC}
              type="password"
              placeholder="비밀번호"
              value={props.password}
              onChange={props.handlePasswordChange}
              onKeyDown={props.onKeyDown}
            />
            <S.Error>{props.passwordError}</S.Error>
          </S.PasswordWrapper>
          <S.PasswordWrapper>
            <Input
              inputType={inputType.BASIC}
              type="password"
              placeholder="비밀번호 확인"
              value={props.passwordCheck}
              onChange={props.handlePasswordCheckChange}
              onKeyDown={props.onKeyDown}
            />
            <S.Error>{props.passwordCheckError}</S.Error>
          </S.PasswordWrapper>
          <S.InputButtonWrapper>
            <S.InputErrorWrapper>
              <Input
                inputType={inputType.BASIC}
                type="text"
                placeholder="닉네임"
                value={props.nickname}
                onChange={props.handleNicknameChange}
                onBlur={props.validateNickname}
                onKeyDown={props.onKeyDown}
              />
              {props.nicknameError ? (
                <S.ErrorNickname>{props.nicknameError}</S.ErrorNickname>
              ) : (
                <S.SuccessNickname>{props.nicknameMessage}</S.SuccessNickname>
              )}
            </S.InputErrorWrapper>
            <Button
              buttonType={buttonType.SHORT}
              text="중복 확인"
              onClick={props.checkDuplicateNickname}
            />
          </S.InputButtonWrapper>
        </S.SignUpInputContainer>

        <Button
          buttonType={
            props.isSignUpButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="가입 완료"
          isFixedAtBottom
          onClick={
            props.isSignUpButtonEnabled ? props.onClickSignUp : props.dummyClick
          }
        />
      </S.SignUpContainer>
    </>
  );
}
