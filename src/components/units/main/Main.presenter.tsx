import { IMainUIProps } from "./Main.types";
import MatchingModal from "./modals/MatchingModal";
import WaitingModal from "./modals/WaitingModal";
import BeforeClickModes from "./sections/beforeclickmodes";
import AfterClickBattle from "./sections/afterclickbattle";

export default function MainUI(props: IMainUIProps) {
  return (
    <>
      {/* <img src='/icon/social.png' onClick={props.onClickSocial}  /> */}
      <img style={{width: "24px", height: "auto", position: "absolute", marginTop:"-60px", marginLeft: "312px"}} src='/icon/myroom.png' onClick={props.onClickMyRoom}  />
      <span style={{color: "white"}}>아이디: </span>
      <input onChange={(e) => props.setDummyUserId(e.target.value)} />
      <span style={{color: "white"}}>캐릭터: </span>
      <input onChange={(e) => props.setDummyCharacter(e.target.value)} />
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
