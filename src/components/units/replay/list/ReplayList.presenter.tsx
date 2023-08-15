import Button, { buttonType } from "../../../commons/button/Button";
import InfiniteScroll from "react-infinite-scroller";
import ListItem from "../../../commons/listItem/ListItem";
import { useState } from "react";
import Label from "../../../commons/label/Label";
import Header from "../../../commons/layout/header/Header";
import * as S from "./ReplayList.styles";
import { S3_PATH } from "../../../../commons/constants/Constants";
import { IReplayListUIProps } from "./ReplayList.types";

export default function ReplayListUI(props: IReplayListUIProps) {
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
            src={`${S3_PATH}/icon/setting.png`}
          />
        ) : (
          <></>
        )}
      </S.HeaderWrapper>
      {!props.isMyReplay && (
        <S.ProfileWrapper>
          {props.character ? (
            <S.Profile
              src={`${S3_PATH}/game/player/profile/${props.character}.png`}
            />
          ) : (
            <S.PlaceholderProfile />
          )}
          <S.Nickname>{props.nickname}</S.Nickname>
        </S.ProfileWrapper>
      )}
      <Label text="리플레이 목록" marginTop="12px" />
      <S.Container isMyReplay={props.isMyReplay}>
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
                    }
                  >
                    <S.SongWrapper>
                      <S.SingerDateWrapper>
                        <S.Singer>{elem.singer}</S.Singer>
                        <S.Date>
                          {props.convertTimeToUnit(elem.createdAt)}
                        </S.Date>
                      </S.SingerDateWrapper>

                      <S.SongTitle>{elem.songTitle}</S.SongTitle>
                    </S.SongWrapper>
                  </ListItem>
                ) : (
                  <ListItem
                    key={idx}
                    rightChildren={
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
                    }
                  >
                    <S.SongWrapper>
                      <S.SingerDateWrapper>
                        <S.Singer>{elem.singer}</S.Singer>
                        <S.Date>
                          {props.convertTimeToUnit(elem.createdAt)}
                        </S.Date>
                      </S.SingerDateWrapper>

                      <S.SongTitle>{elem.songTitle}</S.SongTitle>
                    </S.SongWrapper>
                  </ListItem>
                )
              ) : (
                <ListItem
                  key={idx}
                  rightChildren={
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
                  }
                >
                  <S.SongWrapper>
                    <S.SingerDateWrapper>
                      <S.Singer>{elem.singer}</S.Singer>
                      <S.Date>{props.convertTimeToUnit(elem.createdAt)}</S.Date>
                    </S.SingerDateWrapper>

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
        isFixedAtBottom
      />
    </>
  );
}
