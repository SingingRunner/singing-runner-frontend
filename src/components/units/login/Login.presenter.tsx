import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import Input, { inputType } from "../../commons/input/Input";
import LoginHeader from "../../commons/layout/header/LoginHeader";
import { ILoginUIProps } from "./Login.types";

export default function LoginUI(props: ILoginUIProps) {
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
        <div style={{ marginTop: "-60px", marginBottom: "200px" }}>
          <LoginHeader />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            inputType={inputType.LONG}
            type="text"
            placeholder="이메일"
            value={props.email}
            onChange={props.handleEmailChange}
            onBlur={props.validateEmail}
          />
          <div style={{ height:"18px", color: "red" }}>{props.emailErrorMessage}</div>
        </div>
        <div style={{ width: "100%" }}>
          <Input
            inputType={inputType.LONG}
            type="password"
            placeholder="비밀번호"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
          {!props.passwordErrorMessage ? (
            <div style={{ display: "flex", height: "240px" }}></div>
          ) : (
            <div style={{ height: "240px", color: "red" }}>
              {props.passwordErrorMessage}
            </div>
          )}
        </div>
      </div>

      <ButtonWrapper>
        <Button
          buttonType={
            props.isLoginButtonEnabled
              ? buttonType.GRADATION
              : buttonType.DISABLED
          }
          text="로그인"
          onClick={
            props.isLoginButtonEnabled
              ? props.handleLoginClick
              : props.dummyClick
          }
        />
      </ButtonWrapper>
    </>
  );
}
