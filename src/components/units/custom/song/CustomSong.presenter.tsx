import Button, { buttonType } from "../../../commons/button/Button";
import Input, { inputType } from "../../../commons/input/Input";
import Label from "../../../commons/label/Label";
import Header from "../../../commons/layout/header/Header";
import ListItem from "../../../commons/listItem/ListItem";
import * as S from "./CustomSong.styles";
import { ICustomSongUIProps } from "./CustomSong.types";

export default function CustomSongUI(props: ICustomSongUIProps) {
  return (
    <>
      <Header text="노래 찾기" />
      <Input
        inputType={inputType.SEARCH}
        placeholder="제목 또는 가수 이름으로 검색하세요"
        searchIcon
        // value={}
        // onChange={}
      />
      <Label text="노래 목록" marginTop="16px" />
      <Button
        buttonType={buttonType.FILTER}
        text={props.filter}
        onClick={props.onClickFilter}
      />

      <ListItem
        butonText="선택"
        buttonType={buttonType.SHORT}
        onClick={() => props.onClickSong("노래제목")}
      >
        <S.SongWrapper>
          <S.Singer>일이삼사오육칠팔구십일이삼사오육</S.Singer>
          <S.SongTitle>일이삼사오육칠팔구십일이삼사오육칠</S.SongTitle>
        </S.SongWrapper>
      </ListItem>
      <ListItem
        butonText="선택"
        buttonType={buttonType.SHORT}
        onClick={() => props.onClickSong("노래제목")}
      >
        <S.SongWrapper>
          <S.Singer>일이삼사오육칠팔구십일이삼사오육</S.Singer>
          <S.SongTitle>일이삼사오육칠팔구십일이삼사오육칠</S.SongTitle>
        </S.SongWrapper>
      </ListItem>
    </>
  );
}
