import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { ISignUpUIProps } from "./SignUp.types";

export default function SignUpUI(props: ISignUpUIProps) {
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#1A1128",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: "-8vh", marginBottom: "24vh" }}>
          <LoginHeader />
        </div>
        <div style={{ display: "flex", marginBottom: "2px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              marginRight: "10px",
            }}
          >
            <Input
              inputType={inputType.MEDIUM}
              type="text"
              placeholder="이메일"
              value={props.email}
              onChange={props.handleEmailChange}
              onBlur={props.validateEmail}
            />
            <div style={{ color: "red" }}>{props.emailErrorMessage}</div>
          </div>
          <Button
            buttonType={buttonType.SHORT}
            text="중복 확인"
            onClick={props.checkDuplicateEmail}
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <Input
            inputType={inputType.LONG}
            type="password"
            placeholder="비밀번호"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
          {!props.passwordErrorMessage ? (
            <div style={{ display: "flex", height: "18px" }}></div>
          ) : (
            <div style={{ height: "18px", color: "red" }}>
              {props.passwordErrorMessage}
            </div>
          )}
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <Input
            inputType={inputType.LONG}
            type="password"
            placeholder="비밀번호 확인"
            value={props.passwordCheck}
            onChange={props.handlePasswordCheckChange}
          />
          {!props.passwordCheckErrorMessage ? (
            <div style={{ display: "flex", height: "18px" }}></div>
          ) : (
            <div style={{ height: "18px", color: "red" }}>
              {props.passwordCheckErrorMessage}
            </div>
          )}
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              marginRight: "10px",
            }}
          >
            <Input
              inputType={inputType.MEDIUM}
              type="text"
              placeholder="닉네임"
              value={props.nickname}
              onChange={props.handleNicknameChange}
            />
            {!props.nicknameErrorMessage ? (
              <>
                <div style={{ height: "160px" }}></div>
              </>
            ) : (
              <>
                <div style={{ height: "160px", color: "red" }}>
                  {props.nicknameErrorMessage}
                </div>
              </>
            )}
          </div>
          <Button
            buttonType={buttonType.SHORT}
            text="중복 확인"
            onClick={props.dummyClick}
          />
        </div>
      </div>
      <ButtonWrapper>
        <Button
          buttonType={
            props.isSignUpButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="가입 완료"
          onClick={
            props.isSignUpButtonEnabled
              ? props.handleSignUpFinishClick
              : props.dummyClick
          }
        />
      </ButtonWrapper>
    </>
  );
}
