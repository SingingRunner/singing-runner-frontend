import { useRecoilState, useResetRecoilState } from "recoil";
import Modal from "../../modal/Modal";
import { globalModalState } from "../../../../commons/store";

export default function GlobalModal() {
  const [globalModal] = useRecoilState(globalModalState);
  const globalModalReset = useResetRecoilState(globalModalState);

  return globalModal.isOpen ? (
    <Modal
      {...globalModal}
      onClickRight={() => {
        globalModal.onClickRight?.();
        globalModalReset(); // 모달 닫기
      }}
    />
  ) : (
    <></>
  );
}
