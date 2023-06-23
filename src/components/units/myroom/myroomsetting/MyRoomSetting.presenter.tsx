import Button, { buttonType } from "../../../commons/button/Button";
import ButtonWrapper from "../../../commons/buttons/wrapper";
import Modal from '../../../commons/modal/Modal';
import { IMyRoomSettingUIProps } from "./MyRoomSetting.types";

export default function MyRoomSettingUI(props: IMyRoomSettingUIProps) {
  return (
    <>
      <div style={{ height: "32px", color: "white" }}>키 설정</div>
      <div>
      <Button 
      buttonType={buttonType.ONECOLOR}
      text="원키"/>
      <img src="/images/buttonleft.png" style={{position: "absolute", height: "14px", top: "124px", left: "34px"}}/>
      <img src="/images/buttonright.png" style={{position: "absolute", height: "14px", top: "124px", right: "68px"}}/>
      </div>
      <div style={{ height: "32px", color: "white" }}>리플레이</div>
      <Button 
      buttonType={buttonType.ONECOLOR}
      text="리플레이 목록"
      />
      <ButtonWrapper>
      <div onClick={props.onClickLogout} style={{ height: "44px", marginLeft: "144px", fontSize: "16px", color: "white" }}>로그아웃</div>
        <Button
          buttonType={buttonType.EMPTY}
          text="나가기"
          onClick={props.onClickExit}
        />
      </ButtonWrapper>
      {props.isLogoutClicked && <>
        <Modal
        isCheck={false}
        firstText="로그아웃 하시겠습니까?"
        buttonText='예'
        leftButtonText='아니오'
        onClickRight={props.onClickFinalLogout}
        onClickLeft={props.onClickCancelLogout}
        ></Modal>
      </>}
    </>
  );
}
