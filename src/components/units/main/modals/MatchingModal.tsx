import Modal from "../../../commons/modal/Modal";
import { IMainUIProps } from "../Main.types";

export default function MatchingModal(props: IMainUIProps) {
  return (
    <>
      <Modal
        isCheck={false}
        firstText="매칭이 완료되었습니다."
        singer={props.singer || "매칭 완료 가수"}
        songTitle={
          props.songTitle ||
          "이 메세지가 나온다는 것은 DB에 노래가 없다는 뜻이겠지요."
        }
        buttonText="참여하기"
        leftButtonText="거절하기"
        onClickRight={props.handleMatchAccept}
        onClickLeft={props.handleMatchDecline}
      />
    </>
  );
}
