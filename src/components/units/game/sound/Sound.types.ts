import { Dispatch, SetStateAction } from "react";
import { IPlayersInfo } from "../Game.types";

export interface ISoundProps {
  appliedItems: string[];
  setSongInfo: Dispatch<
    SetStateAction<{
      title: string;
      singer: string;
    }>
  >;
  mrKey: string;
  setDecibel: Dispatch<SetStateAction<number>>;
  isLoadComplete: boolean;
  setIsLoadComplete: Dispatch<SetStateAction<boolean>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  setStartTime: Dispatch<SetStateAction<number>>;
  setPlayersInfo: Dispatch<SetStateAction<IPlayersInfo[]>>;
  setIsTerminated: Dispatch<SetStateAction<boolean>>;
}

export interface ISocketLoadingData {
  gameSong: {
    songTitle: string;
    singer: string;
    songLyrics: string;
    songGender: 0 | 1;
    songMale: string;
    songMaleUp: string;
    songMaleDown: string;
    songFemale: string;
    songFemaleUp: string;
    songFemaleDown: string;
    vocalMale: number[];
    vocalMaleUp: number[];
    vocalMaleDown: number[];
    vocalFemale: number[];
    vocalFemaleUp: number[];
    vocalFemaleDown: number[];
  };
  characterList: [
    { userId: string; character: string },
    { userId: string; character: string },
    { userId: string; character: string }
  ];
}

export interface ISocketGameSongData {
  songTitle: string;
  singer: string;
  songLyrics: string;
  songGender: number;
  songMale: string;
  songMaleUp: string;
  songMaleDown: string;
  songFemale: string;
  songFemaleUp: string;
  songFemaleDown: string;
  vocalMale: number[];
  vocalMaleUp: number[];
  vocalMaleDown: number[];
  vocalFemale: number[];
  vocalFemaleUp: number[];
  vocalFemaleDown: number[];
}
