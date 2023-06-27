import Button, { buttonType } from "../../commons/button/Button";
import InfiniteScroll from "react-infinite-scroller";
import ListItem from "../../commons/listItem/ListItem";
import { IReplayUIProps } from "./Replay.types";
import { useState } from "react";
import Label from "../../commons/label/Label";
import Header from "../../commons/layout/header/Header";
import * as S from "./Replay.styles";

export default function ReplayUI(props: IReplayUIProps) {
  const [isSettingMode, setIsSettingMode] = useState(false);
  return (
    <>
      <Header text="리플레이" />
      <S.HeaderWrapper>
        {props.isMyReplay ? (
          <img
            onClick={() => {
              props.setBtnType(buttonType.SELECT);
              setIsSettingMode(!isSettingMode);
            }}
            style={{
              position: "absolute",
              height: "42px",
              width: "auto",
              top: "8px",
              right: "8px",
            }}
            src="/icon/setting.png"
          />
        ) : (
          <></>
        )}
      </S.HeaderWrapper>
      <Label text="리플레이 목록" marginTop="12px" />
      <S.Container>
        {props.data?.getUserReplays.length === 0 && (
          <div
            style={{
              color: "white",
              marginBottom: "280px",
              fontSize: "24px",
            }}
          >
            리플레이가 없습니다.
          </div>
        )}
        {props.isMyReplay ? (
          <></>
        ) : (
          <S.ProfileWrapper>
            {props.character ? (
              <S.Profile src={`/game/player/profile/${props.character}.png`} />
            ) : (
              <S.PlaceholderProfile />
            )}
            <S.Nickname>{props.nickname}</S.Nickname>
          </S.ProfileWrapper>
        )}
        <S.InfiniteScrollWrapper>
          <InfiniteScroll
            pageStart={0}
            hasMore={true}
            loadMore={props.onLoadMore}
            useWindow={false}
          >
            {props.data?.getUserReplays.map((elem, idx) =>
              props.isMyReplay ? (
                isSettingMode ? (
                  <ListItem
                    key={idx}
                    rightChildren={
                      <div
                        style={{
                          width: "170px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            fontSize: "12px",
                            color: "gray",
                            textAlign: "right",
                          }}
                        >
                          {props.convertTimeToUnit(elem.createdAt)}
                        </div>
                        <Button
                          buttonType={
                            elem.isPublic
                              ? buttonType.SHORT_SELECT
                              : buttonType.SHORT_SELECT_EMPTY
                          }
                          text={elem.isPublic ? "공개" : "비공개"}
                          height="30px"
                          onClick={
                            props.setPublic
                              ? () =>
                                  props.setPublic(elem.replayId, elem.isPublic)
                              : () => {}
                          }
                        />
                      </div>
                    }
                  >
                    <S.SongWrapper>
                      <S.Singer>{elem.singer}</S.Singer>
                      <S.SongTitle>{elem.songTitle}</S.SongTitle>
                    </S.SongWrapper>
                  </ListItem>
                ) : (
                  <ListItem
                    key={idx}
                    rightChildren={
                      <div
                        style={{
                          width: "170px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            fontSize: "12px",
                            color: "gray",
                            textAlign: "right",
                          }}
                        >
                          {props.convertTimeToUnit(elem.createdAt)}
                        </div>
                        <Button
                          buttonType={buttonType.SHORT_PINK}
                          text={"보기"}
                          height="30px"
                          onClick={
                            props.playReplay
                              ? () => props.playReplay(elem.replayId)
                              : () => {}
                          }
                        />
                      </div>
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
                  key={idx}
                  rightChildren={
                    <div
                      style={{
                        width: "170px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          fontSize: "12px",
                          color: "gray",
                          textAlign: "right",
                        }}
                      >
                        {props.convertTimeToUnit(elem.createdAt)}
                      </div>
                      <Button
                        buttonType={buttonType.SHORT_PINK}
                        text={"보기"}
                        height="30px"
                        onClick={
                          props.playReplay
                            ? () => props.playReplay(elem.replayId)
                            : () => {}
                        }
                      />
                    </div>
                  }
                >
                  <S.SongWrapper>
                    <S.Singer>{elem.singer}</S.Singer>
                    <S.SongTitle>{elem.songTitle}</S.SongTitle>
                  </S.SongWrapper>
                </ListItem>
              )
            )}
            <></>
          </InfiniteScroll>
        </S.InfiniteScrollWrapper>
      </S.Container>
      <Button
        buttonType={buttonType.EMPTY}
        text="나가기"
        onClick={props.goPrevPage}
      />
    </>
  );
}
