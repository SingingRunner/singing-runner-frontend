import { useQuery } from "@apollo/client";
import Game from "../../game/Game.container";
import { useRouter } from "next/router";
import { IQuery } from "../../../../commons/types/generated/types";
import { PLAY_REPLAY } from "./Replaydetail.queries";
import { S3_PATH } from "../../../../commons/constants/Constants";
import { useRecoilState } from "recoil";
import { replayStatusState } from "../../../../commons/store";
import { useEffect, useState } from "react";

export default function ReplayDetail() {
  const router = useRouter();
  if (router.query.replayId === undefined) return <div>Loading...</div>;

  const [eventList, setEventList] = useState([]);
  const [replayStatus] = useRecoilState(replayStatusState);
  const [replayEvent, setReplayEvent] = useState<any>();

  const { data, loading } = useQuery<Pick<IQuery, "playReplay">>(PLAY_REPLAY, {
    variables: {
      replayId: +router.query.replayId,
    },
  });

  useEffect(() => {
    getGameEvent();
  }, [data?.playReplay.gameEvent]);

  const getGameEvent = async () => {
    if (!data) return;
    const gameEvent = await fetch(`${S3_PATH}/${data.playReplay.gameEvent}`);
    const gameEventList = await gameEvent.json();
    setEventList(gameEventList);
  };

  useEffect(() => {
    if (replayStatus === "START" && eventList.length > 0) {
      startReplayEvent();
    }
  }, [replayStatus, eventList]);

  if (loading || !data) return <div>Loading...</div>;

  const replayLoadingData = {
    gameSong: data.playReplay.gameSong,
    characterList: data.playReplay.characterList,
    userVocal: data.playReplay.userVocal,
    replayKeynote: data.playReplay.replayKeynote,
  };

  const startReplayEvent = () => {
    eventList.forEach((gameEvent: any) => {
      const event = JSON.parse(gameEvent);
      const EVENT_LIST = [
        "score",
        "use_item",
        "escape_item",
        "game_terminated",
      ];
      if (EVENT_LIST.includes(event.eventName)) {
        setTimeout(() => {
          setReplayEvent(event);
        }, event.timestamp);
      }
    });
  };

  return (
    <Game
      isReplay
      replayData={data}
      replayLoadingData={replayLoadingData}
      replayUserId={router.query.userId as string}
      replayEvent={replayEvent}
    />
  );
}
