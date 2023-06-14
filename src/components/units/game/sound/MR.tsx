import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const songFiles = [
  "/music/jjanggu_mr_5keydown.wav",
  "/music/jjanggu_mr_2keydown.wav",
  "/music/jjanggu_mr_8keydown.wav",
];

interface IMRProps {
  mrKey: string;
  isLoadComplete: boolean;
  setLoadComplete: Dispatch<SetStateAction<boolean>>;
  sources: React.MutableRefObject<AudioBufferSourceNode[]>;
}

export default function MR(props: IMRProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodes = useRef<GainNode[]>([]);
  const sources = props.sources;

  const loadSong = (audioCtx: AudioContext) => {
    Promise.all(
      songFiles.map((file) => fetch(file).then((res) => res.arrayBuffer()))
    )
      .then((datas) =>
        Promise.all(datas.map((data) => audioCtx.decodeAudioData(data)))
      )
      .then((buffers) => {
        gainNodes.current = songFiles.map((_, i) => {
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = 0; // Start all audios muted
          const source = audioCtx.createBufferSource();
          source.buffer = buffers[i];
          source.connect(gainNode).connect(audioCtx.destination);
          sources.current[i] = source;
          return gainNode;
        });
        props.setLoadComplete(true);
      });
  };

  useEffect(() => {
    // If not running in the browser, don't execute the rest of the code
    if (typeof window === "undefined") return;

    // Create AudioContext
    audioCtxRef.current = new window.AudioContext();

    // Use the created AudioContext
    const audioCtx = audioCtxRef.current;
    loadSong(audioCtx);

    // Cleanup function to stop all songs
    return () => {
      sources.current.forEach((source) => {
        source.stop();
      });
      gainNodes.current = [];
      sources.current = [];
    };
  }, []);

  useEffect(() => {
    if (props.isLoadComplete) {
      // If all songs are loaded, start playing them
      sources.current.forEach((source, i) => {
        if (i === 0) {
          gainNodes.current[i].gain.value = 1;
        }
      });
    }
  }, [props.isLoadComplete]);

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

  return null;
}
