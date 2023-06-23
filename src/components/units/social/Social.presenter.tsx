import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import Input, { inputType } from "../../commons/input/Input";
import { ISocialUIProps } from "./Social.types";

export default function SocialUI(props: ISocialUIProps) {
  return (
    <>
      <div style={{height: "20px"}}>
        <img
          src="/icon/setting.png"
          style={{
            width: "40px",
            height: "auto",
            marginTop: "-68px",
            marginLeft: "292px",
            marginBottom: "48px",
          }}
          onClick={props.onClickSetting}
        />
      </div>
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
        <div style={{ width: "100%", marginTop: "-620px" }}>
          <Input
            inputType={inputType.LONG}
            type="text"
            placeholder="닉네임으로 검색하세요"
          />
          <div style={{ color: "white", marginTop: "16px" }}>친구 목록</div>
        </div>
        <img
          src="/icon/group.png"
          style={{ height: "24px", marginLeft: "280px", marginTop: "16px" }}
          onClick={props.onClickReplay}
        />
      </div>

      <ButtonWrapper>
        <Button
          buttonType={buttonType.EMPTY}
          text="나가기"
          onClick={props.onClickExit}
        />
      </ButtonWrapper>
    </>
  );
}
