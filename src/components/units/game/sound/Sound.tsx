import { useEffect, useState, useRef, useContext } from "react";
import PitchAndDecibel from "./PitchAndDecibel";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import { ISocketLoadingData, ISoundProps } from "./Sound.types";
import { FETCH_USER_BY_USER_ID, FETCH_USER } from "../Game.queries";
import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUserByUserIdArgs,
} from "../../../../commons/types/generated/types";

export default function Sound(props: ISoundProps) {
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const { data: userData } = useQuery<Pick<IQuery, "fetchUser">>(FETCH_USER);
  const [userId] = useRecoilState(userIdState);

  const [isKeyUp, setKeyUp] = useState(false);
  const [isKeyDown, setKeyDown] = useState(false);
  const [isFrozen, setFrozen] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isSuper, setIsSuper] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodes = useRef<GainNode[]>([]);
  const sources = useRef<AudioBufferSourceNode[]>([]);
  const [replaySources, setReplaySources] = useState<any[]>([]);

  const [originAnswer, setOriginAnswer] = useState<number[]>([]);
  const [keyUpAnswer, setKeyUpAnswer] = useState<number[]>([]);
  const [keyDownAnswer, setKeyDownAnswer] = useState<number[]>([]);

  const { data: replayUserData } = props.replayUserId
    ? useQuery<Pick<IQuery, "fetchUserByUserId">, IQueryFetchUserByUserIdArgs>(
        FETCH_USER_BY_USER_ID,
        {
          variables: { userId: props.replayUserId },
        }
      )
    : { data: null };

  useEffect(() => {
    if (props.isUserExit || props.isTerminated) {
      sources.current.forEach((source) => {
        source.stop();
      });
      audioCtxRef.current?.close();
    }
  }, [props.isUserExit, props.isTerminated]);

  useEffect(() => {
    // 현재 실행되고 있는 아이템
    if (props.appliedItems.includes("keyUp")) setKeyUp(true);
    else setKeyUp(false);
    if (props.appliedItems.includes("keyDown")) setKeyDown(true);
    else setKeyDown(false);
    if (props.appliedItems.includes("frozen")) setFrozen(true);
    else setFrozen(false);
    if (props.appliedItems.includes("mute")) setMute(true);
    else setMute(false);
    if (props.appliedItems.includes("super")) setIsSuper(true);
    else setIsSuper(false);
  }, [...props.appliedItems]);

  useEffect(() => {
    if (!props.isReplay) {
      socket?.emit("loading", { userId });
    }

    audioCtxRef.current = new window.AudioContext();
    const audioCtx = audioCtxRef.current;

    /** 입장한 게임의 MR, 정답 데이터, 유저 정보(id & 캐릭터) 조회 */
    const fetchRoomInfo = async (data: ISocketLoadingData | any) => {
      try {
        const lyricsData = await fetch(data.gameSong.songLyrics);
        const lyricsList = await lyricsData.json();
        props.setLyrics(
          lyricsList.data.map((el) => {
            return { endTime: el.endTime, lyric: el.lyric };
          })
        );

        // 정답 데이터
        if (!props.isReplay) {
          const answers = getAnswerData(data);
          const ans1 = await fetch(answers[0] || "");
          const ans2 = await fetch(answers[1] || "");
          const ans3 = await fetch(answers[2] || "");
          const ans1Text = await ans1.text();
          const ans2Text = await ans2.text();
          const ans3Text = await ans3.text();
          const ans1Array = ans1Text.split(",").map((value) => Number(value));
          setOriginAnswer(ans1Array);
          const ans2Array = ans2Text.split(",").map((value) => Number(value));
          setKeyUpAnswer(ans2Array);
          const ans3Array = ans3Text.split(",").map((value) => Number(value));
          setKeyDownAnswer(ans3Array);
        }

        // MR 파일
        const songFiles = getMR(data);

        const response = await Promise.all(
          songFiles.map(async (file, idx) => {
            const result = await fetch(file);
            props.setProgress((prev) => {
              if (idx === 2 || prev + 30 >= 100) return 100;
              return prev + 30;
            });
            return result;
          })
        );

        const arrayBuffers = await Promise.all(
          response.map((res) => res.arrayBuffer())
        );
        const audioBuffers = await Promise.all(
          arrayBuffers.map((data) => {
            return audioCtx.decodeAudioData(data);
          })
        );

        gainNodes.current = audioBuffers.map((buffer, i) => {
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = 0; // Start all audios muted
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(gainNode).connect(audioCtx.destination);
          sources.current.push(source);
          setReplaySources([source]);

          if (i === 0) {
            gainNode.gain.value = 1;
            if (props.isReplay) {
              gainNode.gain.value = 0.4;
            }
          }
          return gainNode;
        });

        if (props.isReplay) {
          const userVocal = await fetch(data.userVocal || "").then((res) =>
            res.text()
          );
          const base64Data = userVocal.split(",")[1];
          const decodedData = Buffer.from(base64Data, "base64");
          const buffer = await audioCtx.decodeAudioData(decodedData.buffer);
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = 1;
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(gainNode).connect(audioCtx.destination);
          sources.current.push(source);
          gainNodes.current.push(gainNode);
          setReplaySources([source]);
        }

        // 유저 정보
        if (props.replayUserId) {
          props.setPlayersInfo(() => {
            const newPlayersInfo = [
              {
                userId: props.replayUserId || "",
                character: replayUserData?.fetchUserByUserId.character || "",
                activeItem: "",
                score: 0,
                position: "mid",
              },
            ];
            if (data.characterList === undefined) return newPlayersInfo;
            data.characterList.forEach((el, i) => {
              // 현재 유저 제외하고 추가
              if (el.userId !== props.replayUserId && el.userId !== "none") {
                newPlayersInfo.push({
                  userId: data.characterList[i].userId,
                  character: data.characterList[i].character,
                  activeItem: "",
                  score: 0,
                  position: newPlayersInfo.length < 2 ? "right" : "left",
                });
              } else {
                if (el.userId !== "none")
                  newPlayersInfo[0].character =
                    data.characterList?.[i].character || "";
              }
            });
            return newPlayersInfo;
          });
        } else {
          props.setPlayersInfo(() => {
            const newPlayersInfo = [
              {
                userId,
                character: userData?.fetchUser.character || "",
                activeItem: "",
                score: 0,
                position: "mid",
              },
            ];
            data.characterList?.forEach((el, i) => {
              // 현재 유저 제외하고 추가
              if (el.userId !== userId) {
                newPlayersInfo.push({
                  userId: data.characterList?.[i].userId || "",
                  character: data.characterList?.[i].character || "",
                  activeItem: "",
                  score: 0,
                  position: newPlayersInfo.length < 2 ? "right" : "left",
                });
              } else {
                newPlayersInfo[0].character =
                  data.characterList?.[i].character || "";
              }
            });
            return newPlayersInfo;
          });
        }

        // 곡 정보
        props.setSongInfo({
          title: data.gameSong.songTitle,
          singer: data.gameSong.singer,
        });
        // 로딩 완료 신호 보내기
        if (!props.isReplay) {
          socket?.emit("game_ready", { userId });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (props.isReplay) {
      fetchRoomInfo(props.replayLoadingData);
    } else {
      socket?.on("loading", fetchRoomInfo);
    }
    return () => {
      socket?.off("loading", fetchRoomInfo);
    };
  }, [socket]);

  const getMR = (data: ISocketLoadingData) => {
    let keyOrigin: string;
    let keyUp: string;
    let keyDown: string;
    const gameSong = data.gameSong;
    if (!gameSong) return [];
    const userKeynote = props.isReplay
      ? data.replayKeynote
      : userData?.fetchUser.userKeynote;
    switch (userKeynote) {
      case 1:
        keyOrigin = gameSong.songFemale;
        keyUp = gameSong.songFemaleUp;
        keyDown = gameSong.songFemaleDown;
        break;
      case 2:
        keyOrigin = gameSong.songMale;
        keyUp = gameSong.songMaleUp;
        keyDown = gameSong.songMaleDown;
        break;
      default:
        keyOrigin = !gameSong.songGender
          ? gameSong.songMale
          : gameSong.songFemale;
        keyUp = !gameSong.songGender
          ? gameSong.songMaleUp
          : gameSong.songFemaleUp;
        keyDown = !gameSong.songGender
          ? gameSong.songMaleDown
          : gameSong.songFemaleDown;
        break;
    }
    return [keyOrigin, keyUp, keyDown];
  };

  const getAnswerData = (data: ISocketLoadingData) => {
    let answerOrigin: string | undefined;
    let answerUp: string | undefined;
    let answerDown: string | undefined;
    const gameSong = data.gameSong;
    const userKeynote = props.isReplay
      ? data.replayKeynote
      : userData?.fetchUser.userKeynote;
    switch (userKeynote) {
      case 1:
        answerOrigin = gameSong?.vocalFemale;
        answerUp = gameSong?.vocalFemaleUp;
        answerDown = gameSong?.vocalFemaleDown;
        break;
      case 2:
        answerOrigin = gameSong?.vocalMale;
        answerUp = gameSong?.vocalMaleUp;
        answerDown = gameSong?.vocalMaleDown;
        break;
      default:
        answerOrigin = !gameSong?.songGender
          ? gameSong?.vocalMale
          : gameSong?.vocalFemale;
        answerUp = !gameSong?.songGender
          ? gameSong?.vocalMaleUp
          : gameSong.vocalFemaleUp;
        answerDown = !gameSong?.songGender
          ? gameSong?.vocalMaleDown
          : gameSong?.vocalFemaleDown;
        break;
    }
    return [answerOrigin, answerUp, answerDown];
  };

  const changeMRKey = (index: number) => {
    gainNodes.current.forEach((gainNode, i) => {
      if (i === 3) return;
      gainNode.gain.value = i === index ? 1 : 0;
      if (props.isReplay) {
        gainNode.gain.value = i === index ? 0.4 : 0;
      }
    });
  };

  useEffect(() => {
    if (props.mrKey === "origin") changeMRKey(0);
    else if (props.mrKey === "keyUp") changeMRKey(1);
    else if (props.mrKey === "keyDown") changeMRKey(2);
  }, [props.mrKey]);

  return (
    <PitchAndDecibel
      preventEvent={props.preventEvent}
      isReplay={props.isReplay}
      setPlayersInfo={props.setPlayersInfo}
      isLoadComplete={props.isLoadComplete}
      originAnswer={originAnswer}
      keyUpAnswer={keyUpAnswer}
      keyDownAnswer={keyDownAnswer}
      isKeyUp={isKeyUp}
      isKeyDown={isKeyDown}
      isFrozen={isFrozen}
      isMute={isMute}
      isSuper={isSuper}
      setDecibel={props.setDecibel}
      sources={sources}
      replaySources={replaySources}
      setIsLoadComplete={props.setIsLoadComplete}
      setStartTime={props.setStartTime}
      setIsTerminated={props.setIsTerminated}
      setBase64Data={props.setBase64Data}
      replayEvent={props.replayEvent}
    />
  );
}
