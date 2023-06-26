export interface ILyricProps {
  startTime: number;
  isCloud: boolean;
  lyrics: ILyric[];
}

export interface ILyric {
  endTime: number;
  lyric: string;
}
