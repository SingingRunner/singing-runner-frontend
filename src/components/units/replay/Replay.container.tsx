import { useRecoilValue } from "recoil";
import ReplayUI from "./Replay.presenter";
import { userInfoState } from "../../../commons/store";
import { useRouter } from "next/router";
import { useState } from "react";
import { buttonType } from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";
import { gql, useQuery } from "@apollo/client";

const FETCH_REPLAYS = gql`
  query FetchReplays($userId: String!, $page: Int, $isMyReplay: Boolean) {
    fetchReplays(userId: $userId, page: $page, isMyReplay: $isMyReplay) {
      replayId
      songTitle
      singer
      createdAt
      isPublic
    }
  }
`;

export default function Replay() {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo.userId;
  const router = useRouter();
  const isMyReplay = router.query.userId === userId;
  const { data, fetchMore, refetch } = useQuery(FETCH_REPLAYS);
  // const [data, setData] = useState([]);
  const [btnType, setBtnType] = useState(buttonType.SHORT_PINK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReplay, setCurrentReplay] = useState(0);

  const onLoadMore = (): void => {
    console.log("onLoadMore");
    void fetchMore({
      variables: { page: Math.ceil(data?.fetchReplays.length ?? 10 / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchReplays === undefined)
          return { fetchReplays: [...prev.fetchReplays] };
        return {
          fetchReplays: [...prev.fetchReplays, ...fetchMoreResult.fetchReplays],
        };
      },
    });
  };

  const playReplay = (replayId: number) => {
    console.log("hello");
  };

  const setPublic = (replayId: number, isPublic: boolean) => {
    console.log("hello");
    if (!isPublic) {
      setCurrentReplay(replayId);
      setIsModalOpen(true);
    } else {
      console.log("?");
    }
  };

  const cancelChange = () => {
    setIsModalOpen(false);
  };

  const changeToPublic = () => {
    console.log(currentReplay);
    refetch();
    // data.fetchReplays.forEach((elem) => {});
    setIsModalOpen(false);
  };

  const goPrevPage = () => {
    router.back();
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
        goPrevPage={goPrevPage}
      />
      {isModalOpen ? (
        <Modal
          isCheck={true}
          firstText="선택한 플레이 기록을"
          secondText="공개하시겠어요?"
          buttonText="확인"
          leftButtonText="취소"
          onClickRight={changeToPublic}
          onClickLeft={cancelChange}
        />
      ) : null}
    </>
  );
}
