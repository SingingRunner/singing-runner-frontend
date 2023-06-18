import Button, { buttonType } from "../../../commons/button/Button";
import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";

export default function Signup(props: IMainUIProps) {
  return (
    <div
      style={{
        // width: "100vw",
        height: "100%",
        backgroundColor: "#1A1128",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "120px", marginTop: "-20px" }}>
        <S.ImageWrapper>
          <S.ImageVectorLeft src="../images/Vector_left.png" alt="vector" />
          <S.ImageLogo
            style={{ width: "200px" }}
            src="../images/game_logo.png"
            alt="logo"
          />
        </S.ImageWrapper>
      </div>
      <div style={{ color: "#FFFFFF" }}>회원가입 화면!!!(임시)</div>

      <div style={{ display: "flex", marginBottom: "2px", width: "100%" }}>
        <input
          type="text"
          placeholder="이메일"
          style={{
            flex: 1,
            marginRight: "10px",
            height: "40px",
            border: "1px solid #C7C7C7",
            borderRadius: "4px",
            paddingLeft: "20px",
          }}
          onChange={props.handleEmailChange}
          // defaultValue={props.email}
        />
        <Button
          buttonType={buttonType.SHORT}
          text="중복 확인"
          onClick={props.handleClick}
        />
      </div>
      <div style={{ color: "red" }}>{emailError ?? ""}</div>

      <div
        style={{
          marginBottom: "18px",
          marginLeft: "0",
          marginRight: "0",
          width: "100%",
        }}
      >
        <input
          type="password"
          placeholder="비밀번호"
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid #C7C7C7",
            borderRadius: "4px",
            paddingLeft: "20px",
          }}
          onChange={props.onChangePassword}
          defaultValue={props.password}
        />
      </div>

      <div
        style={{
          marginBottom: "18px",
          marginLeft: "0",
          marginRight: "0",
          width: "100%",
        }}
      >
        <input
          type="password"
          placeholder="비밀번호 확인"
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid #C7C7C7",
            borderRadius: "4px",
            paddingLeft: "20px",
          }}
          onChange={props.onChangePasswordCheck}
          defaultValue={props.passwordCheck}
        />
      </div>

      <div style={{ display: "flex", marginBottom: "80px", width: "100%" }}>
        <input
          type="text"
          placeholder="닉네임"
          style={{
            flex: 1,
            marginRight: "10px",
            height: "40px",
            border: "1px solid #C7C7C7",
            borderRadius: "4px",
            paddingLeft: "20px",
          }}
          onChange={props.onChangeNickname}
          defaultValue={props.nickname}
        />
        <Button
          buttonType={buttonType.SHORT}
          text="중복 확인"
          onClick={props.handleClick}
        />
      </div>
      <Button
        buttonType={buttonType.GRADATION}
        text="가입 완료"
        onClick={props.handleLoginClick}
      />
    </div>
  );
}
