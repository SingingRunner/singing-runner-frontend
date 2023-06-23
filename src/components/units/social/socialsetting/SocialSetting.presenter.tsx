import Button, { buttonType } from "../../../commons/button/Button";
import ButtonWrapper from "../../../commons/buttons/wrapper";
import Input, { inputType } from "../../../commons/input/Input";
import { ISocialSettingUIProps } from './SocialSetting.types';

export default function SocialSettingUI(props: ISocialSettingUIProps) {
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
        <div style={{ width: "100%", marginTop: "-620px" }}>
          <Input
            inputType={inputType.LONG}
            type="text"
            placeholder="닉네임으로 검색하세요"
          />
          <div style={{color: "white", marginTop: "16px"}}>친구 목록</div>
        </div>
      </div>

      <ButtonWrapper>
        <Button
          buttonType={buttonType.EMPTY}
          text="나가기"
          onClick={props.exitClick}
        />
      </ButtonWrapper>
    </>
  );
}
