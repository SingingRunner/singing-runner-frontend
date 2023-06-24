import Modal from "../../../commons/modal/Modal";
import { IMainUIProps } from "../Main.types";

export default function WaitingModal(props: IMainUIProps) {
  return (
    <>
      {/* 아래 화면은 props.showWaiting이 true가 될 때 보여집니다. */}
      <Modal
        isCheck
        firstText="다른 유저를 기다리는 중입니다."
        singer={props.singer || "노래 가수(이것은 대기 화면)"}
        songTitle={props.songTitle || "노래 제목(여기는 대기 화면입니다.)"}
        onClickRight={props.handleMatchDecline} // 임시 클릭
      />
    </>
  );
}
