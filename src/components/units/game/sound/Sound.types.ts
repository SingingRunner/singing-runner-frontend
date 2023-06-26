import { Dispatch, SetStateAction } from "react";
import { IPlayersInfo } from "../Game.types";
import { ILyric } from "../lyric/Lyric.types";

export interface ISoundProps {
  preventEvent?: boolean;
  isReplay?: boolean;
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
  setBase64Data: Dispatch<SetStateAction<string>>;
  setLyrics: Dispatch<SetStateAction<ILyric[]>>;
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
    vocalMale: string;
    vocalMaleUp: string;
    vocalMaleDown: string;
    vocalFemale: string;
    vocalFemaleUp: string;
    vocalFemaleDown: string;
  };
  characterList: [
    { userId: string; character: string },
    { userId: string; character: string },
    { userId: string; character: string }
  ];
  userVocal?: string;
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
  vocalMale: string;
  vocalMaleUp: string;
  vocalMaleDown: string;
  vocalFemale: string;
  vocalFemaleUp: string;
  vocalFemaleDown: string;
}
