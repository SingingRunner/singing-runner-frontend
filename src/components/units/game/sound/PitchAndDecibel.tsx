import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import { IPitchAndDecibelProps, ISocketScore } from "./PitchAndDecibel.types";

import { useRecoilState } from "recoil";
import { replayStatusState, userIdState } from "../../../../commons/store";

const pitchToMIDINoteValue = (pitch: number): number => {
  const A4MIDINoteValue = 69; // MIDI note value for A4 (440 Hz)
  const pitchReference = 440.0; // Reference pitch for A4 (440 Hz)
  const pitchOffset = 12 * Math.log2(pitch / pitchReference);
  const midiNoteValue = Math.round(A4MIDINoteValue + pitchOffset);

  return midiNoteValue;
};

const calculateDecibel = (value: number): number => {
  const minDecibel = -90;
  const maxDecibel = 0;

  const minAmplitude = 0.00001;
  const maxAmplitude = 1;

  const amplitude = value / 255;
  const rangeAmplitude = maxAmplitude - minAmplitude;
  const normalizedAmplitude = (amplitude - minAmplitude) / rangeAmplitude;

  const rangeDecibel = maxDecibel - minDecibel;
  const decibel = minDecibel + rangeDecibel * normalizedAmplitude;

  return decibel;
};

const getScoreFromDiff = (answerNote: number, userNote: number): number => {
  const diff = Math.abs(answerNote - userNote);
  if (diff === 0) return 100;
  if (diff >= 1 && diff < 3) return 100;
  if (diff >= 3 && diff < 5) return 90;
  if (diff >= 5 && diff < 9) return 70;
  if (diff >= 9 && diff < 14) return 60;
  if (diff >= 14 && diff < 20) return 55;
  else return 50;
};

export default function PitchAndDecibel(props: IPitchAndDecibelProps) {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [userId] = useRecoilState(userIdState);

  const pitchAveragesRef = useRef<number[]>([]);

  const avgPitchWindowSize = 1000;
  let avgPitch: number = 0;
  let pitchSamples: number = 0;
  let startTime: number = 0;
  let totalScore: number = 0;
  let currentIdx: number = 0;
  let ignoreCount: number = 0;
  let currentScore: number = 0;
  let audioContext: AudioContext | null = null;
  let mediaStreamSource: MediaStreamAudioSourceNode | null = null;
  let analyzer: AnalyserNode | null = null;
  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  const [, setReplayStatus] = useRecoilState(replayStatusState);
  useEffect(() => {
    if (props.replaySources.length) gameReady();
  }, [props.replaySources]);

  useEffect(() => {
    if (!props.isReplay) {
      socket?.on("game_ready", gameReady);
    }
    socket?.on("score", scoreListener);

    return () => {
      socket?.off("game_ready", gameReady);
      socket?.off("score", scoreListener);
    };
  }, [socket]);

  useEffect(() => {
    if (props.isReplay && props.replayEvent?.eventName === "score") {
      scoreListener(props.replayEvent.eventContent);
    }
  }, [props.replayEvent]);

  const gameReady = () => {
    if (props.isReplay) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
          const nowTime = performance.now();
          props.setStartTime(nowTime);
          props.replaySources.forEach((source) => {
            source.start();
          });
          setReplayStatus("START");
        })
        .catch((e) => console.log(e));
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleAudioStream)
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }
    props.setIsLoadComplete(true);
  };

  const scoreListener = (data: ISocketScore) => {
    props.setPlayersInfo((prev) => {
      const temp = [...prev];
      const idx = temp.findIndex(
        (newScoreEl) => newScoreEl.userId === data.userId
      );
      if (idx !== -1) temp[idx].score = data.score;
      return temp;
    });
  };

  const [, setPrevScore] = useState(0);
  const calculateScore = (noteValue: number, idx: number): number => {
    if (props.isReplay) return 0;
    let score: number = 0;
    let answer: number[] = [];
    const originAnswer = propsRef.current.originAnswer;
    const keyUpAnswer = propsRef.current.keyUpAnswer;
    const keyDownAnswer = propsRef.current.keyDownAnswer;

    if (propsRef.current.isKeyUp && keyUpAnswer != null) {
      answer = keyUpAnswer;
    } else if (propsRef.current.isKeyDown && keyDownAnswer != null) {
      answer = keyDownAnswer;
    } else if (originAnswer != null) {
      answer = originAnswer;
    }

    if (propsRef.current.isSuper) {
      score = Math.floor(currentScore * 1.5);
    } else if (propsRef.current.isFrozen) {
      score = Math.floor((currentScore * 2) / 3);
    } else if (propsRef.current.isMute) {
      score = Math.floor((currentScore * 2) / 3);
    } else {
      score = getScoreFromDiff(answer[idx], noteValue);
    }

    score = Math.min(score, 100 * (currentIdx + 1 - ignoreCount) - totalScore);

    if (answer[idx] === 0) {
      ignoreCount++;
    } else {
      totalScore += score;
    }
    if (++currentIdx !== ignoreCount) {
      currentScore = Math.round(totalScore / (currentIdx - ignoreCount));
    }

    // 서버에 현재 유저의 점수 전송
    setPrevScore((prev) => {
      if (prev !== currentScore) {
        socket?.emit("score", { userId, score: Math.min(currentScore, 100) });
      }
      return currentScore;
    });

    return currentScore;
  };

  const handleAudioStream = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    let isGameTerminated = false;

    audioContext = new window.AudioContext();
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 2048;
    mediaStreamSource.connect(analyzer);
    const pitchWorker = new Worker("/game/sound/calculatePitchWorker.js");
    const nowTime = performance.now();
    props.setStartTime(nowTime);
    const sources = propsRef.current.sources;
    sources.current.forEach((source) => {
      source.start();
    });
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = (e) => {
      const blob = new Blob(chunks, { type: "audio/ogg" });
      const reader = new FileReader();
      pitchWorker.terminate();
      reader.readAsDataURL(blob);
      isGameTerminated = true;
      reader.onloadend = () => {
        props.setBase64Data(reader.result as string);
        socket?.emit("game_terminated", {
          userId,
          score: currentScore,
        });
      };
    };
    mediaRecorder.start();

    propsRef.current.sources.current[0].onended = () => {
      mediaRecorder.stop();
    };

    pitchWorker.addEventListener("message", (event) => {
      const pitch: number = event.data.pitch;
      if (pitch != null && pitch > 0) {
        avgPitch += pitchToMIDINoteValue(pitch);
        pitchSamples++;
      }
      const currentTime = event.data.time;
      if (startTime === 0 && currentTime != null) {
        startTime = currentTime;
      }
      if (currentTime != null) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime > avgPitchWindowSize) {
          if (pitchSamples <= 0) {
            pitchAveragesRef.current.push(0);
            calculateScore(0, currentIdx);
          } else {
            const averagePitch = avgPitch / pitchSamples;
            const avgMIDINoteValue = Math.round(averagePitch);
            pitchAveragesRef.current.push(avgMIDINoteValue);
            calculateScore(avgMIDINoteValue, currentIdx);
          }
          avgPitch = 0;
          pitchSamples = 0;
          startTime = currentTime;
        }
      }
    });

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const frequencyArray = new Uint8Array(bufferLength);

    const processAudio = (cb) => {
      requestAnimationFrame(cb);
    };

    const processAudioCb = (fps) => {
      const fpsInterval = 1000 / fps;
      let then: number;
      if (isGameTerminated) return;

      const cb = (timestamp) => {
        if (isGameTerminated) return;
        if (startTime === 0 && then === undefined) {
          startTime = performance.now();
          then = performance.now();
        }
        const elapsed = timestamp - then;

        if (elapsed >= fpsInterval) {
          analyzer?.getFloatTimeDomainData(dataArray);
          analyzer?.getByteFrequencyData(frequencyArray);
          let sum = 0;
          for (let i = 0; i < frequencyArray.length; i++) {
            sum += frequencyArray[i];
          }
          const avg = sum / frequencyArray.length;
          if (propsRef.current.isMute) {
            const decibel = calculateDecibel(avg);
            propsRef.current.setDecibel(decibel);
          }
          pitchWorker.postMessage({
            array: dataArray,
            time: performance.now(),
          });
          then = timestamp - (elapsed % fpsInterval);
        }
        requestAnimationFrame(cb);
      };
      return cb;
    };

    processAudio(processAudioCb(15));
  };

  return null;
}
