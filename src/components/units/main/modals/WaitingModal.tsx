import Modal from "../../../commons/modal/Modal";
import { IMainUIProps } from "../Main.types";

export default function WaitingModal(props: IMainUIProps) {
  return (
    <>
      <Modal
        isCheck={false}
        firstText="다른 유저를 기다리는 중입니다." // TODO: 이 부분 수정이 필요합니다.
        singer={props.singer || "노래 가수(이것은 대기 화면)"}
        songTitle={props.songTitle || "노래 제목(여기는 대기 화면입니다.)"}
        // TODO: 모달 아래 버튼이 없으면 좋겠습니다. (buttonText, onClickRight 불필요)
        buttonText="버튼이 없으면 좋겠어요."
        onClickRight={props.handleMatchDecline} // 임시 클릭
      />
    </>
  );
}
