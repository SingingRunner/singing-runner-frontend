import CustomSongUI from "./CustomSong.presenter";
// import { useRecoilState } from "recoil";
// import { roomInfoState } from "../../../../commons/store";
import { useState } from "react";
export default function CustomSong() {
  // const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [filter, setFilter] = useState("최신순");
  const onClickFilter = () => {
    if (filter === "최신순") setFilter("제목순");
    else if (filter === "제목순") setFilter("이름순");
    else setFilter("최신순");
  };
  const onClickSong = (song: string) => {};
  return (
    <CustomSongUI
      filter={filter}
      onClickFilter={onClickFilter}
      onClickSong={onClickSong}
    />
  );
}
