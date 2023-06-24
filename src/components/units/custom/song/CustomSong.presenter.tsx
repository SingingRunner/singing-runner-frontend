import { useRouter } from "next/router";
import Button, { buttonType } from "../../../commons/button/Button";
import Input, { inputType } from "../../../commons/input/Input";
import Label from "../../../commons/label/Label";
import Header from "../../../commons/layout/header/Header";
import ListItem from "../../../commons/listItem/ListItem";
import NoData from "../../../commons/noData/NoData";
import * as S from "./CustomSong.styles";
import { ICustomSongUIProps } from "./CustomSong.types";
import { v4 as uuidv4 } from "uuid";
import { isKeyword } from "../../../../commons/libraries/isKeyword";
import InfiniteScroll from "react-infinite-scroller";

export default function CustomSongUI(props: ICustomSongUIProps) {
  const router = useRouter();

  return (
    <>
      <Header text="노래 찾기" />

      <Input
        inputType={inputType.SEARCH}
        placeholder="제목 또는 가수 이름으로 검색하세요"
        searchIcon
        value={props.keyword}
        onChange={props.onChangeKeyword}
      />

      <Label text="노래 목록" marginTop="16px" />

      <Button
        buttonType={buttonType.FILTER}
        text={
          props.filter === "createdAt"
            ? "최신순"
            : props.filter === "songTitle"
            ? "제목순"
            : "이름순"
        }
        onClick={props.onClickFilter}
      />
      {props.data?.searchSong.length ? (
        <S.ListWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.searchSong.map((el) => (
              <ListItem
                key={uuidv4()}
                buttonText="선택"
                buttonType={buttonType.SHORT}
                // 🚨 songId로 변경 예정
                // onClick={() => props.onChangeSong(el.songId)}
                onClick={() => props.onChangeSong(el.songTitle)}
              >
                <S.SongWrapper>
                  {props.keyword !== "" ? (
                    <>
                      <S.Singer>
                        {el.singer
                          .replaceAll(props.keyword, `!@#$${props.keyword}!@#$`)
                          .split("!@#$")
                          .map((word, i) => (
                            <S.SingerWord
                              key={uuidv4()}
                              isMatched={props.keyword.trim() === word}
                              marginRight={isKeyword(
                                el.singer,
                                props.keyword,
                                i
                              )}
                            >
                              {word}
                            </S.SingerWord>
                          ))}
                      </S.Singer>
                      <S.SongTitle>
                        {el.songTitle
                          .replaceAll(props.keyword, `!@#$${props.keyword}!@#$`)
                          .split("!@#$")
                          .map((word, i) => (
                            <S.SongTitleWord
                              key={uuidv4()}
                              isMatched={props.keyword.trim() === word}
                              marginRight={isKeyword(
                                el.songTitle,
                                props.keyword,
                                i
                              )}
                            >
                              {word}
                            </S.SongTitleWord>
                          ))}
                      </S.SongTitle>
                    </>
                  ) : (
                    <>
                      <S.SingerWord>{el.singer}</S.SingerWord>
                      <S.SongTitle>
                        <S.SongTitleWord>{el.songTitle}</S.SongTitleWord>
                      </S.SongTitle>
                    </>
                  )}
                </S.SongWrapper>
              </ListItem>
            ))}
          </InfiniteScroll>
        </S.ListWrapper>
      ) : (
        <NoData />
      )}

      <Button
        buttonType={buttonType.GRADATION}
        text="완료"
        onClick={() => router.back()}
        isFixedAtBottom
      />
    </>
  );
}
