import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  // useState,
} from "react";
import * as PitchFinder from "pitchfinder";
import { useRecoilState, useRecoilValue } from "recoil";
import { usersIdInfoState } from "../../../../commons/store";
import { SocketContext } from "../../../../commons/contexts/SocketContext";

const pitchDetector = PitchFinder.AMDF({
  sampleRate: 44100,
  minFrequency: 82,
  maxFrequency: 1000,
});

const pitchToMIDINoteValue = (pitch: number): number => {
  const A4MIDINoteValue = 69; // MIDI note value for A4 (440 Hz)
  const pitchReference = 440.0; // Reference pitch for A4 (440 Hz)
  const pitchOffset = 12 * Math.log2(pitch / pitchReference);
  const midiNoteValue = Math.round(A4MIDINoteValue + pitchOffset);

  return midiNoteValue;
};

const calculatePitch = (audioData: Float32Array): number | null => {
  const pitch = pitchDetector(audioData);
  return pitch;
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

const getScoreFromDiff = (
  answerNote: number,
  userNote: number,
  currentScore: number
): number => {
  const diff = Math.abs(answerNote - userNote);
  if (diff === 0) return 100;
  if (diff === 1) return 100;
  if (diff === 2) return 90;
  if (diff === 3) return 80;
  if (diff === 4) return 70;
  if (diff === 5) return 60;
  if (diff === 6) return 40;
  else return currentScore;
};

interface IPitchAndDecibelProps {
  isLoadComplete: boolean;
  originAnswer: number[];
  keyUpAnswer: number[];
  keyDownAnswer: number[];
  isKeyUp: boolean;
  setKeyUp: Dispatch<SetStateAction<boolean>>;
  isKeyDown: boolean;
  setKeyDown: Dispatch<SetStateAction<boolean>>;
  isFrozen: boolean;
  setFrozen: Dispatch<SetStateAction<boolean>>;
  isMute: boolean;
  setMute: Dispatch<SetStateAction<boolean>>;
  setDecibel: Dispatch<SetStateAction<number>>;
  setPlayersScore: Dispatch<SetStateAction<number[]>>;
  sources: React.MutableRefObject<AudioBufferSourceNode[]>;
}

export default function PitchAndDecibel(props: IPitchAndDecibelProps) {
  const socket = useContext(SocketContext);
  const usersIdInfo = useRecoilValue(usersIdInfoState);
  const pitchAveragesRef = useRef<number[]>([]);
  // const [isLoadCompleteAll, setIsLoadCompleteAll] = useState<boolean>(false);
  const [, setUserIdInfoState] = useRecoilState(usersIdInfoState);

  const avgPitchWindowSize = 3;
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

  useEffect(() => {
    console.log("usersidinfo: ", usersIdInfo);
  }, [usersIdInfo]);

  useEffect(() => {
    const tmp = (userData) => {
      console.log("game_ready");
      console.log("arrive time: ", new Date().getTime());
      const myId = socket?.id;
      console.log(userData);
      const otherUsers = userData.filter((user: any) => user !== myId);
      setUserIdInfoState([myId, ...otherUsers]);
      // setIsLoadCompleteAll(true);
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleAudioStream)
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    };
    socket?.on("game_ready", tmp);
  }, [socket]);

  useEffect(() => {
    console.log("registering score listener");
    console.log("useridinfo", usersIdInfo);
    const scoreListener = (data) => {
      console.log("received score event", data);
      usersIdInfo.forEach((userId, i) => {
        if (userId === data.user) {
          console.log("found matching user for score event", userId);
          props.setPlayersScore((prev) => {
            const newScore = [...prev];
            newScore[i] = data.score;
            return newScore;
          });
        }
      });
    };
    socket?.on("score", scoreListener);
  }, [socket, usersIdInfo]);

  const calculateScore = (noteValue: number, idx: number): number => {
    let score: number = 0;
    let answer: number[] = [];

    if (props.isKeyUp && props.keyUpAnswer != null) {
      answer = props.keyUpAnswer;
    } else if (props.isKeyDown && props.keyDownAnswer != null) {
      answer = props.keyDownAnswer;
    } else if (props.originAnswer != null) {
      answer = props.originAnswer;
    }

    if (props.isFrozen) {
      score = Math.floor((currentScore * 2) / 3);
    } else if (props.isMute) {
      score = Math.floor((currentScore * 2) / 3);
    } else {
      score = getScoreFromDiff(answer[idx], noteValue, currentScore);
    }

    if (score === 0 && answer[idx] === 0) {
      ignoreCount++;
    }
    totalScore += score;
    if (++currentIdx !== ignoreCount) {
      currentScore = Math.round(totalScore / (currentIdx - ignoreCount));
    }
    props.setPlayersScore((prev) => {
      const newScore = [...prev];
      newScore[0] = currentScore;
      return newScore;
    });

    // 서버에 현재 유저의 점수 전송
    console.log(currentScore);
    socket?.emit("score", currentScore);

    return currentScore;
  };

  const handleAudioStream = (stream: MediaStream) => {
    const sources = props.sources;
    sources.current.forEach((source, i) => {
      source.start();
    });
    audioContext = new window.AudioContext();
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 8192;
    mediaStreamSource.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const frequencyArray = new Uint8Array(bufferLength);

    const processAudio = () => {
      analyzer?.getFloatTimeDomainData(dataArray);
      analyzer?.getByteFrequencyData(frequencyArray);
      let sum = 0;
      for (let i = 0; i < frequencyArray.length; i++) {
        sum += frequencyArray[i];
      }
      const avg = sum / frequencyArray.length;
      const decibel = calculateDecibel(avg);
      props.setDecibel(decibel);
      const pitch = calculatePitch(dataArray);
      if (pitch != null && pitch > 0) {
        avgPitch += pitchToMIDINoteValue(pitch);
        pitchSamples++;
      }

      const currentTime = audioContext?.currentTime;
      if (startTime === 0 && currentTime != null) {
        startTime = currentTime;
      }

      if (currentTime != null) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= avgPitchWindowSize) {
          if (pitchSamples === 0) {
            pitchAveragesRef.current.push(0);
            currentIdx++;
            ignoreCount++;
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

      requestAnimationFrame(processAudio);
    };

    processAudio();
  };

  useEffect(() => {
    if (props.isLoadComplete) {
      socket?.emit("game_ready");
    }
  }, [props.isLoadComplete]);

  // useEffect(() => {
  // if (isLoadCompleteAll) {
  // }
  // }, [isLoadCompleteAll]);

  return null;
}
