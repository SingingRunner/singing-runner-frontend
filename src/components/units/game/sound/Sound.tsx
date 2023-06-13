import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MR from "./MR";
import PitchAndDecibel from "./PitchAndDecibel";

interface ISoundProps {
  mrKey: string;
  setDecibel: Dispatch<SetStateAction<number>>;
  setPlayersScore: Dispatch<SetStateAction<number[]>>;
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

  useEffect(() => {
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
        console.log("111", ans1Array);
        console.log("222", ans2Array);
        console.log("333", ans3Array);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiles().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <MR
        mrKey={props.mrKey}
        isLoadComplete={isLoadComplete}
        setLoadComplete={setLoadComplete}
      />

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
      />
    </>
  );
}
