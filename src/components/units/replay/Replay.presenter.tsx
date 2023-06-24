import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import InfiniteScroll from "react-infinite-scroller";
import ListItem from "../../commons/listItem/ListItem";
import { IReplayUIProps } from "./Replay.types";
import { useState } from "react";
import * as S from "./Replay.styles";

export default function ReplayUI(props: IReplayUIProps) {
  const [isSettingMode, setIsSettingMode] = useState(false);
  return (
    <>
      {props.isMyReplay ? (
        <img
          onClick={() => {
            console.log("a");
            props.setBtnType(buttonType.SELECT);
            setIsSettingMode(!isSettingMode);
          }}
          style={{
            position: "absolute",
            height: "40px",
            width: "auto",
            top: "8px",
            right: "8px",
          }}
          src="/icon/setting.png"
        />
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50px",
            position: "relative",
          }}
        >
          <img
            style={{
              position: "absolute",
              width: "46px",
              left: "4px",
              top: "-4px",
            }}
            src="/images/yellowcat.png"
            alt="logo"
          />
        </div>
      )}
      <div style={{ height: "650px", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          hasMore={true}
          loadMore={props.onLoadMore}
          useWindow={false}
        >
          {props.data?.fetchReplays.map((elem, index) =>
            props.isMyReplay ? (
              isSettingMode ? (
                <ListItem
                  key={elem.replayId}
                  buttonText={elem.isPublic ? "공개" : "비공개"}
                  buttonType={
                    elem.isPublic
                      ? buttonType.SHORT_SELECT
                      : buttonType.SHORT_SELECT_EMPTY
                  }
                  onClick={
                    props.setPublic
                      ? () => props.setPublic(elem.replayId, elem.isPublic)
                      : () => {}
                  }
                >
                  <S.SongWrapper>
                    <S.Singer>{elem.singer}</S.Singer>
                    <S.SongTitle>{elem.songTitle}</S.SongTitle>
                  </S.SongWrapper>
                </ListItem>
              ) : (
                <ListItem
                  key={elem.replayId}
                  buttonText="보기"
                  buttonType={buttonType.SHORT_PINK}
                  onClick={
                    props.playReplay
                      ? () => props.playReplay(elem.replayId)
                      : () => {}
                  }
                >
                  <S.SongWrapper>
                    <S.Singer>{elem.singer}</S.Singer>
                    <S.SongTitle>{elem.songTitle}</S.SongTitle>
                  </S.SongWrapper>
                </ListItem>
              )
            ) : (
              <ListItem
                key={elem.replayId}
                buttonText="보기"
                buttonType={buttonType.SHORT_PINK}
                onClick={
                  props.playReplay ? () => props.playReplay(index) : () => {}
                }
              >
                <S.SongWrapper>
                  <S.Singer>{elem.singer}</S.Singer>
                  <S.SongTitle>{elem.songTitle}</S.SongTitle>
                </S.SongWrapper>
              </ListItem>
            )
          )}
        </InfiniteScroll>
      </div>
      <ButtonWrapper>
        <Button
          buttonType={buttonType.EMPTY}
          text="나가기"
          onClick={props.goPrevPage}
        />
      </ButtonWrapper>
    </>
  );
}
