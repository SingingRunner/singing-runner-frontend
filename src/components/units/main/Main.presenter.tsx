import { IMainUIProps } from "./Main.types";
import MatchingModal from "./modals/MatchingModal";
import WaitingModal from "./modals/WaitingModal";
import BeforeClickModes from "./sections/beforeclickmodes";
import AfterClickBattle from "./sections/afterclickbattle";
import Character from "./character/Character";
import * as S from "./Main.styles";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isNotificationState } from "../../../commons/store";

export default function MainUI(props: IMainUIProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sound/effect/popup.mp3");
  }, []);

  const onClickMenu = (path: string) => {
    audioRef.current?.play();
    router.push(path);
  };
  const [isNotification] = useRecoilState(isNotificationState);
  return (
    <>
      <S.LogoWrapper onClick={() => onClickMenu("/main")}>
        <S.LogoText>Singing Runner</S.LogoText>
      </S.LogoWrapper>
      <S.HeaderWrapper>
        <img
          src="/icon/header/manual.png"
          onClick={() => onClickMenu("/main/manual")}
        />
        <img
          src="/icon/header/social.png"
          onClick={() => onClickMenu("/social")}
        />
        <img
          src="/icon/header/notification.png"
          onClick={() => onClickMenu("/notification")}
        />
        {isNotification && <S.Notification />}
        <img
          src="/icon/header/myroom.png"
          onClick={() => onClickMenu("/myroom")}
        />
      </S.HeaderWrapper>

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
