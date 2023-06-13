import { useEffect, useState } from "react";
import PitchAnalyzer from "./temp_component/pitch";
import PlaySongsSimultaneously from "./temp_component/PlaySongsSimultaneously";
//testpage
export default function TestPage() {
  const [isLoadComplete, setLoadComplete] = useState(false);
  const [isKeyUp, setKeyUp] = useState(false);
  const [isKeyDown, setKeyDown] = useState(false);
  const [isFrozen, setFrozen] = useState(false);
  const [isMute, setMute] = useState(false);
  let ans1Array: number[] | null = null;
  let ans2Array: number[] | null = null;
  let ans3Array: number[] | null = null;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const ans1 = await fetch("/origin.txt");
        const ans2 = await fetch("/keyUp.txt");
        const ans3 = await fetch("/keyDown.txt");
        const ans1Text = await ans1.text();
        const ans2Text = await ans2.text();
        const ans3Text = await ans3.text();
        ans1Array = ans1Text.split(",").map((value) => {
          return Number(value);
        });
        ans2Array = ans2Text.split(",").map((value) => {
          return Number(value);
        });
        ans3Array = ans3Text.split(",").map((value) => {
          return Number(value);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiles();
  }, []);

  return (
    <>
      <PlaySongsSimultaneously
        isLoadComplete={isLoadComplete}
        setLoadComplete={setLoadComplete}
      />
      <PitchAnalyzer
        isLoadComplete={isLoadComplete}
        originAnswer={ans1Array}
        keyUpAnswer={ans2Array}
        keyDownAnswer={ans3Array}
        isKeyUp={false}
        isKeyDown={false}
        isFrozen={false}
        isMute={false}
        setKeyUp={setKeyUp}
        setKeyDown={setKeyDown}
        setFrozen={setFrozen}
        setMute={setMute}
      />
    </>
  );
}
