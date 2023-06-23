export interface ICustomSongUIProps {
  filter: string;
  onClickFilter: () => void;
  onClickSong: (song: string) => void;
}
