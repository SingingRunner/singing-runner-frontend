import { useRecoilState } from "recoil";
import ReplayUI from "./Replay.presenter";
import { userIdState } from "../../../commons/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { buttonType } from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useMutation, useQuery } from "@apollo/client";
import {
  FETCH_USER_BY_USER_ID,
  GET_USER_REPLAYS,
  UPDATE_PUBLIC,
} from "./Replay.queries";
import {
  IQuery,
  IQueryGetUserReplaysArgs,
} from "../../../commons/types/generated/types";

export default function Replay() {
  const router = useRouter();
  const [isMyReplay, setIsMyReplay] = useState(true);
  const [currentUserId] = useRecoilState(userIdState);
  const [updatePublic] = useMutation(UPDATE_PUBLIC);
  const [btnType, setBtnType] = useState(buttonType.SHORT_PINK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReplay, setCurrentReplay] = useState(0);
  const [character, setCharacter] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");

  const { data: userData } = useQuery<Pick<IQuery, "fetchUserByUserId">>(
    FETCH_USER_BY_USER_ID,
    {
      variables: {
        userId: router.query.userId as string,
      },
      fetchPolicy: "network-only",
    }
  );

  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "getUserReplays">,
    IQueryGetUserReplaysArgs
  >(GET_USER_REPLAYS, {
    variables: {
      isMyReplay,
      pageNumber: 1,
      userId: router.query.userId as string,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (userData?.fetchUserByUserId) {
      setCharacter(userData?.fetchUserByUserId.character);
      setNickname(userData?.fetchUserByUserId.nickname);
    }
  }, [userData, isMyReplay]);

  useEffect(() => {
    setUserId(router.query.userId as string);
  }, []);

  useEffect(() => {
    setIsMyReplay(currentUserId === router.query.userId);
  }, [userId]);

  dayjs.locale("ko"); // 언어를 한국어로 설정
  dayjs.extend(relativeTime); // 플러그인 활성화

  const convertTimeToUnit = (receivedAt: string) => {
    if (!receivedAt) {
      return "알 수 없음";
    }

    return dayjs().to(dayjs(receivedAt));
  };

  const onLoadMore = (): void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        pageNumber: Math.ceil((data?.getUserReplays.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getUserReplays === undefined) return prev;
        return {
          getUserReplays: [
            ...prev.getUserReplays,
            ...fetchMoreResult.getUserReplays,
          ],
        };
      },
    });
  };

  const playReplay = (replayId: number) => {
    router.push(`/replay/ingame/${userId}/${replayId}`);
  };

  const setPublic = async (replayId: number, isPublic: boolean) => {
    if (!isPublic) {
      setCurrentReplay(replayId);
      setIsModalOpen(true);
    } else {
      await updatePublic({
        variables: {
          replayId,
          isPublic: 0,
        },
      });
      refetch();
    }
  };

  const cancelChange = () => {
    setIsModalOpen(false);
  };

  const changeToPublic = async () => {
    await updatePublic({
      variables: {
        replayId: currentReplay,
        isPublic: 1,
      },
    });
    refetch();
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
        convertTimeToUnit={convertTimeToUnit}
        character={character}
        nickname={nickname}
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
