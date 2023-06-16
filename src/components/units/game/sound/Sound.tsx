import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import PitchAndDecibel from "./PitchAndDecibel";

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
  hideLoading: boolean;
  setHideLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}
export default function Sound(props: ISoundProps) {
  const [isLoadComplete, setLoadComplete] = useState(false);
  const [isKeyUp, setKeyUp] = useState(false);
  const [isKeyDown, setKeyDown] = useState(false);
  const [isFrozen, setFrozen] = useState(false);
  const [isMute, setMute] = useState(false);
  const [ans1Array, setAns1Array] = useState<number[]>([]);
  const [ans2Array, setAns2Array] = useState<number[]>([]);
  const [ans3Array, setAns3Array] = useState<number[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodes = useRef<GainNode[]>([]);
  const sources = useRef<AudioBufferSourceNode[]>([]);

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
    audioCtxRef.current = new window.AudioContext();
    const audioCtx = audioCtxRef.current;
    const fetchFiles = async () => {
      try {
        const ans1 = await fetch("/origin.txt");
        const ans2 = await fetch("/keyUp.txt");
        const ans3 = await fetch("/keyDown.txt");
        const ans1Text = await ans1.text();
        const ans2Text = await ans2.text();
        const ans3Text = await ans3.text();
        const ans1ArrayTmp = ans1Text.split(",").map((value) => {
          return Number(value);
        });
        setAns1Array(ans1ArrayTmp);
        const ans2ArrayTmp = ans2Text.split(",").map((value) => {
          return Number(value);
        });
        setAns2Array(ans2ArrayTmp);
        const ans3ArrayTmp = ans3Text.split(",").map((value) => {
          return Number(value);
        });
        setAns3Array(ans3ArrayTmp);
        const response = await Promise.all(
          songFiles.map((file) => fetch(file))
        );
        const arrayBuffers = await Promise.all(
          response.map((res) => res.arrayBuffer())
        );
        const audioBuffers = await Promise.all(
          arrayBuffers.map((data) => {
            props.setProgress(props.progress + 30);
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

        props.setHideLoading(true);
        props.setLoading(false);
        setLoadComplete(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiles().catch((err) => {
      console.log(err);
    });
  }, []);

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
      {/* <MR
        mrKey={props.mrKey}
        isLoadComplete={isLoadComplete}
        setLoadComplete={setLoadComplete}
        sources={sources}
      /> */}

      <PitchAndDecibel
        isLoadComplete={isLoadComplete}
        originAnswer={ans1Array}
        keyUpAnswer={ans2Array}
        keyDownAnswer={ans3Array}
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
      />
    </>
  );
}
