import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import Modal from "../../modal/Modal";
import { globalModalState } from "../../../../commons/store";

export default function GlobalModal() {
  const globalModal = useAtomValue(globalModalState);
  const resetGlobalModal = useResetAtom(globalModalState);

  return globalModal.isOpen ? (
    <Modal
      {...globalModal}
      onClickRight={() => {
        globalModal.onClickRight?.();
        resetGlobalModal(); // 모달 닫기
      }}
    />
  ) : (
    <></>
  );
}
