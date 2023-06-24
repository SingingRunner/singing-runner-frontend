import { IMyRoomSettingUIProps } from "./MyRoomSetting.types";
import Button, { buttonType } from "../../../commons/button/Button";
import Modal from "../../../commons/modal/Modal";
import * as S from "./MyRoomSetting.styles";

export default function MyRoomSettingUI(props: IMyRoomSettingUIProps) {
  return (
    <>
      <S.Option>키 설정</S.Option>
      <Button buttonType={buttonType.SELECT} text="원키" />
      <S.Option>리플레이</S.Option>
      <Button 
      buttonType={buttonType.ONECOLOR_PINK} 
      onClick={props.onClickReplay}
      text="리플레이 목록" />
      <S.Logout onClick={props.onClickLogout}>로그아웃</S.Logout>
      <Button
        buttonType={buttonType.EMPTY}
        text="나가기"
        isFixedAtBottom
        onClick={props.onClickExit}
      />
      {props.isLogoutClicked && (
        <>
          <Modal
            isCheck={false}
            firstText="로그아웃 하시겠습니까?"
            buttonText="예"
            leftButtonText="아니오"
            onClickRight={props.onClickFinalLogout}
            onClickLeft={props.onClickCancelLogout}
          ></Modal>
        </>
      )}
    </>
  );
}
