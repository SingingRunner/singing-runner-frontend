import { useEffect, useState, useRef, useContext } from "react";
import PitchAndDecibel from "./PitchAndDecibel";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { userIdState } from "../../../../commons/store";

import {
  ISocketGameSongData,
  ISocketLoadingData,
  ISoundProps,
} from "./Sound.types";
import { FETCH_USER } from "../Game.queries";
import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUserArgs,
} from "../../../../commons/types/generated/types";

export default function Sound(props: ISoundProps) {
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [userId] = useRecoilState(userIdState);

  const { data: userData } = useQuery<
    Pick<IQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_USER, { variables: { userId } });

  const router = useRouter();

  const [isKeyUp, setKeyUp] = useState(false);
  const [isKeyDown, setKeyDown] = useState(false);
  const [isFrozen, setFrozen] = useState(false);
  const [isMute, setMute] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodes = useRef<GainNode[]>([]);
  const sources = useRef<AudioBufferSourceNode[]>([]);
  const [originAnswer, setOriginAnswer] = useState<number[]>([]);
  const [keyUpAnswer, setKeyUpAnswer] = useState<number[]>([]);
  const [keyDownAnswer, setKeyDownAnswer] = useState<number[]>([]);

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
  }, [props.appliedItems]);

  useEffect(() => {
    if (socket) {
      if (props.isReplay) {
        socket.emit("load_replay", router.query.id);
      } else {
        socket.emit("loading");
      }
      audioCtxRef.current = new window.AudioContext();
      const audioCtx = audioCtxRef.current;
      /** 입장한 게임의 MR, 정답 데이터, 유저 정보(id & 캐릭터) 조회 */
      const fetchRoomInfo = async (data: ISocketLoadingData) => {
        try {
          // 정답 데이터
          getAnswerData(data.gameSong); // 🚨 정답 데이터 받을 때 쓰세요
          const ans1 = await fetch("/origin.txt");
          const ans2 = await fetch("/keyUp.txt");
          const ans3 = await fetch("/keyDown.txt");
          const ans1Text = await ans1.text();
          const ans2Text = await ans2.text();
          const ans3Text = await ans3.text();
          const ans1Array = ans1Text.split(",").map((value) => Number(value));
          setOriginAnswer(ans1Array);
          const ans2Array = ans2Text.split(",").map((value) => Number(value));
          setKeyUpAnswer(ans2Array);
          const ans3Array = ans3Text.split(",").map((value) => Number(value));
          setKeyDownAnswer(ans3Array);

          // MR 파일
          const songFiles = getMR(data.gameSong);

          const response = await Promise.all(
            songFiles.map(async (file, idx) => {
              const result = await fetch(file);
              props.setProgress((prev) => {
                if (idx === 2) return 100;
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
            sources.current[i] = source;
            if (i === 0) {
              gainNode.gain.value = 1;
            }
            return gainNode;
          });

          // 유저 정보
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
            data.characterList.forEach((el, i) => {
              // 현재 유저 제외하고 추가
              if (el.userId !== userId) {
                newPlayersInfo.push({
                  userId: data.characterList[i].userId,
                  character: data.characterList[i].character,
                  activeItem: "",
                  score: 0,
                  position: newPlayersInfo.length < 2 ? "right" : "left",
                });
              } else {
                newPlayersInfo[0].character = data.characterList[i].character;
              }
            });
            return newPlayersInfo;
          });

          // 곡 정보
          props.setSongInfo({
            title: data.gameSong.songTitle,
            singer: data.gameSong.singer,
          });

          // 로딩 완료 신호 보내기
          if (props.isReplay) {
            socket.emit("start_replay", router.query.replayId, userId);
          } else {
            socket?.emit("game_ready");
          }
        } catch (err) {
          console.log(err);
        }
      };

      if (props.preventEvent) {
        socket.on("load_replay", fetchRoomInfo);
      } else {
        socket.on("loading", fetchRoomInfo);
      }
    }
  }, [socket]);

  const getMR = (gameSong: ISocketGameSongData) => {
    let keyOrigin: string;
    let keyUp: string;
    let keyDown: string;
    switch (userData?.fetchUser.userKeynote) {
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
        keyOrigin =
          gameSong.songGender === 0 ? gameSong.songMale : gameSong.songFemale;
        keyUp =
          gameSong.songGender === 0
            ? gameSong.songMaleUp
            : gameSong.songFemaleUp;
        keyDown =
          gameSong.songGender === 0
            ? gameSong.songMaleDown
            : gameSong.songFemaleDown;
        break;
    }
    return [keyOrigin, keyUp, keyDown];
  };

  const getAnswerData = (gameSong: ISocketGameSongData) => {
    let answerOrigin: number[];
    let answerUp: number[];
    let answerDown: number[];
    switch (userData?.fetchUser.userKeynote) {
      case 1:
        answerOrigin = gameSong.vocalFemale;
        answerUp = gameSong.vocalFemaleUp;
        answerDown = gameSong.vocalFemaleDown;
        break;
      case 2:
        answerOrigin = gameSong.vocalMale;
        answerUp = gameSong.vocalMaleUp;
        answerDown = gameSong.vocalMaleDown;
        break;
      default:
        answerOrigin =
          gameSong.songGender === 0 ? gameSong.vocalMale : gameSong.vocalFemale;
        answerUp =
          gameSong.songGender === 0
            ? gameSong.vocalMaleUp
            : gameSong.vocalFemaleUp;
        answerDown =
          gameSong.songGender === 0
            ? gameSong.vocalMaleDown
            : gameSong.vocalFemaleDown;
        break;
    }
    return [answerOrigin, answerUp, answerDown];
  };

  const changeMRKey = (index: number) => {
    gainNodes.current.forEach((gainNode, i) => {
      gainNode.gain.value = i === index ? 1 : 0;
    });
  };

  useEffect(() => {
    if (props.mrKey === "origin") changeMRKey(0);
    else if (props.mrKey === "keyUp") changeMRKey(1);
    else if (props.mrKey === "keyDown") changeMRKey(2);
  }, [props.mrKey]);

  return (
    <>
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
        setDecibel={props.setDecibel}
        sources={sources}
        setIsLoadComplete={props.setIsLoadComplete}
        setStartTime={props.setStartTime}
        setIsTerminated={props.setIsTerminated}
      />
    </>
  );
}
