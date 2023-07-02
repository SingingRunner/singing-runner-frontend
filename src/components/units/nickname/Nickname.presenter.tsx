import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { INicknameUIProps } from "./Nickname.types";
import * as S from "./Nickname.styles";
import Button, { buttonType } from "../../commons/button/Button";

export default function NicknameUI(props: INicknameUIProps) {
  return (
    <>
      <S.NicknameContainer>
        <LoginHeader />

        <S.NicknameInputContainer>
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
        </S.NicknameInputContainer>

        <Button
          buttonType={
            props.isNicknameButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="가입 완료"
          isFixedAtBottom
          onClick={
            props.isNicknameButtonEnabled ? props.onClickComplete : props.dummyClick
          }
        />
      </S.NicknameContainer>
    </>
  );
}
