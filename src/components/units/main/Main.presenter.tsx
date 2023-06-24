import { IMainUIProps } from "./Main.types";
import MatchingModal from "./modals/MatchingModal";
import WaitingModal from "./modals/WaitingModal";
import BeforeClickModes from "./sections/beforeclickmodes";
import AfterClickBattle from "./sections/afterclickbattle";

import Character from "./character/Character";

export default function MainUI(props: IMainUIProps) {
  // // 🚨 임시 가데이터 - 여기부터
  // const [, setUserInfo] = useRecoilState(userInfoState);
  // const changeUserId = (e: ChangeEvent<HTMLInputElement>) => {
  //   props.setDummyUserId(e.target.value);
  //   setUserInfo((prev) => ({ ...prev, userId: e.target.value }));
  // };
  // const changeCharacter = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = event.target.value;
  //   props.setDummyCharacter(selectedValue);
  //   setUserInfo((prev) => ({ ...prev, character: event.target.value }));
  // };
  // const getRandomOption = () => {
  //   const options = [
  //     "beluga",
  //     "puma",
  //     "husky",
  //     "hare",
  //     "lynx",
  //     "snowLeopard",
  //     "narwhal",
  //     "puffin",
  //   ];
  //   const randomCharacter = options[Math.floor(Math.random() * options.length)];
  //   setUserInfo((prev) => ({ ...prev, character: randomCharacter }));
  //   return randomCharacter;
  // };
  // useEffect(() => {
  //   props.setDummyCharacter(getRandomOption());
  // }, [props.setDummyCharacter]);
  // // 🚨 임시 가데이터 - 여기까지
  return (
    <>
      <img
        style={{
          width: "24px",
          height: "auto",
          position: "absolute",
          marginTop: "-60px",
          marginLeft: "312px",
          zIndex: 1,
        }}
        src="/icon/myroom.png"
        onClick={props.onClickMyRoom}
      />
      <img
        style={{
          width: "44px",
          height: "auto",
          position: "absolute",
          marginTop: "-68px",
          marginLeft: "268px",
          zIndex: 1,
        }}
        src="/icon/social.png"
        onClick={props.onClickSocial}
      />
      {/* 🚨 임시 가데이터 - 여기부터 */}
      {/* <div style={{ zIndex: 1, position: "fixed" }}>
        아이디
        <input onChange={changeUserId} />
        캐릭터
        <select value={props.dummyCharacter} onChange={changeCharacter}>
          <option value="beluga">하늘색고래</option>
          <option value="puma">황토색무언가</option>
          <option value="husky">개</option>
          <option value="hare">토끼ㅋ</option>
          <option value="lynx">주황색?점박이</option>
          <option value="snowLeopard">회색점박이</option>
          <option value="narwhal">퍼런고래</option>
          <option value="puffin">새</option>
          <option value="moose">무스</option>
        </select>
      </div> */}

      {/* 🚨 임시 가데이터 - 여기까지 */}

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
