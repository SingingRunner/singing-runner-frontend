import { useRecoilValue } from "recoil";
import ReplayUI from "./Replay.presenter";
import { userInfoState } from "../../../commons/store";
import { useRouter } from "next/router";
import { useState } from "react";
import { buttonType } from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";

export default function Replay() {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo.userId;
  const router = useRouter();
  const isMyReplay = router.query.userId === userId;
  const [data, setData] = useState([]);
  const [btnType, setBtnType] = useState(buttonType.SHORT_PINK);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLoadMore = (): void => {
    console.log("onLoadMore");
    const page = Math.ceil(data.length / 10) + 1;
    setData([...data, page]);
  };

  const playReplay = (replayId: number) => {
    console.log("hello");
  };

  const setPublic = (replayId: number, isPublic: boolean) => {
    console.log("hello");
    if (!isPublic) {
      setIsModalOpen(true);
    } else {
      console.log("?");
    }
  };

  return (
    <>
      <ReplayUI
        isMyReplay={isMyReplay}
        btnType={btnType}
        setBtnType={setBtnType}
        playReplay={playReplay}
        setPublic={setPublic}
        onLoadMore={onLoadMore}
        data={data}
      />
      {isModalOpen ? (
        <Modal
          isCheck={true}
          hilightText="공개하시겠습니까?"
          firstText="공개"
          secondText="비공개"
          buttonText="확인"
          leftButtonText="취소"
          onClickRight={() => {}}
          onClickLeft={() => {}}
        />
      ) : null}
    </>
  );
}
