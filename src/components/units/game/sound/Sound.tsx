import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import PitchAndDecibel from "./PitchAndDecibel";
import { IRival } from "../Game.types";
import { SocketContext } from "../../../../commons/contexts/SocketContext";

const songFiles = [
  "/music/jjanggu_mr.wav",
  "/music/jjanggu_mr_3keyup.wav",
  "/music/jjanggu_mr_3keydown.wav",
];
interface ISoundProps {
  mrKey: string;
  setDecibel: Dispatch<SetStateAction<number>>;
  setPlayersScore: Dispatch<SetStateAction<number[]>>;
  activeItem: {
    mute: boolean;
    frozen: boolean;
    cloud: boolean;
    keyDown: boolean;
    keyUp: boolean;
    shield: boolean;
  };
  isLoadComplete: boolean;
  setIsLoadComplete: Dispatch<SetStateAction<boolean>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  setRivals: Dispatch<SetStateAction<IRival[] | undefined>>;
  setStartTime: Dispatch<SetStateAction<number>>;
}

export default function Sound(props: ISoundProps) {
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

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
    // 값이 true인 속성의 키 찾기(현재 실행되고 있는 아이템)
    for (const key in props.activeItem) {
      if (Object.prototype.hasOwnProperty.call(props.activeItem, key)) {
        switch (key) {
          case "keyUp":
            if (props.activeItem[key]) setKeyUp(true);
            else setKeyUp(false);
            break;
          case "keyDown":
            if (props.activeItem[key]) setKeyDown(true);
            else setKeyDown(false);
            break;
          case "frozen":
            if (props.activeItem[key]) setFrozen(true);
            else setFrozen(false);
            break;
          case "mute":
            if (props.activeItem[key]) setMute(true);
            else setMute(false);
        }
      }
    }
  }, [props.activeItem]);

  useEffect(() => {
    if (socket) {
      socket.emit("loading");
      audioCtxRef.current = new window.AudioContext();
      const audioCtx = audioCtxRef.current;
      const fetchFiles = async () => {
        try {
          console.log(props);
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
          const response = await Promise.all(
            songFiles.map(async (file) => {
              const result = await fetch(file);
              props.setProgress(props.progress + 30);
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
          socket?.emit("game_ready");
        } catch (err) {
          console.log(err);
        }
      };
      // 로딩 화면에서 소켓 통신으로 노래 data 받음
      socket.on("loading", fetchFiles);
    }
  }, [socket]);

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
        isLoadComplete={props.isLoadComplete}
        originAnswer={originAnswer}
        keyUpAnswer={keyUpAnswer}
        keyDownAnswer={keyDownAnswer}
        isKeyUp={isKeyUp}
        isKeyDown={isKeyDown}
        isFrozen={isFrozen}
        isMute={isMute}
        setKeyUp={setKeyUp}
        setKeyDown={setKeyDown}
        setFrozen={setFrozen}
        setMute={setMute}
        setDecibel={props.setDecibel}
        setPlayersScore={props.setPlayersScore}
        sources={sources}
        setRivals={props.setRivals}
        setIsLoadComplete={props.setIsLoadComplete}
        setStartTime={props.setStartTime}
      />
    </>
  );
}
