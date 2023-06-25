import { IMainUIProps } from "./Main.types";
import MatchingModal from "./modals/MatchingModal";
import WaitingModal from "./modals/WaitingModal";
import BeforeClickModes from "./sections/beforeclickmodes";
import AfterClickBattle from "./sections/afterclickbattle";

import Character from "./character/Character";
import Header from "../../commons/layout/header/Header";

export default function MainUI(props: IMainUIProps) {
  return (
    <>
      <Header text="메인asdfsasdfasdfsdf" noPrev={true}></Header>


      <img
        style={{
          width: "44px",
          height: "auto",
          position: "absolute",
          marginTop: "-68px",
          right: "82px",
          // zIndex: 1,
        }}
        src="/icon/social.png"
        onClick={props.onClickSocial}
      />
      <img
        style={{
          width: "44px",
          height: "auto",
          position: "absolute",
          top: "8px",
          right: "44px",
          // zIndex: 1,
        }}
        src="/icon/notification.png"
        onClick={props.onClickNotification}
      />
        <img
          style={{
            width: "24px",
            height: "auto",
            position: "absolute",
            marginTop: "-60px",
            right: "16px",
            // zIndex: 1,
          }}
          src="/icon/myroom.png"
          onClick={props.onClickMyRoom}
        />

      <Character />
      {!props.isBattleClicked && <BeforeClickModes {...props} />}
      {/* 1. START 클릭 후 모드 선택 화면 */}
      {props.isBattleClicked && <AfterClickBattle {...props} />}
      {/* 2. 배틀 모드 클릭 후 화면 */}
      {props.showModal && <MatchingModal {...props} />}
      {/* 3. 매칭 모달 */}
      {props.showWaiting && <WaitingModal {...props} />}
      {/* 4. 매칭 완료 후 대기 모달 */}
    </>
  );
}
