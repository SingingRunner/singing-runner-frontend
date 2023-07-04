import InfiniteScroll from "react-infinite-scroller";
import Button, { buttonType } from "../../commons/button/Button";
import Input, { inputType } from "../../commons/input/Input";
import ListItem from "../../commons/listItem/ListItem";
import ProfileCard from "../../commons/profileCard/ProfileCard";
import { ISocialUIProps } from "./Social.types";
import { v4 as uuidv4 } from "uuid";
import * as S from "./Social.styles";
import Label from "../../commons/label/Label";
import Header from "../../commons/layout/header/Header";

export default function SocialUI(props: ISocialUIProps) {
  return (
    <>
      <Header onClickPrev={props.onClickExit} text="친구 목록" />
      <S.Add src="/icon/friends.png" onClick={props.onClickAdd} />
      <S.Setting src="/icon/delete-friend.png" onClick={props.onClickSetting} />

      <S.Container>
        <S.InputWrapper>
          <S.SearchIcon src="/icon/search-purple.png" />
          <Input
            inputType={inputType.SEARCH}
            type="text"
            placeholder="닉네임으로 검색하세요"
            value={props.keyword}
            onChange={props.onChangeNickname}
          />
          <Label text="친구 목록" marginTop="16px" />
        </S.InputWrapper>
        {!props.hasFetched && <></>}
        {props.hasFetched && (
          <>
            {props.loading && <div>loading...</div>}
            {!props.loading && (
              <>
                {!props.keyword &&
                  !props.data?.searchFriend.length &&
                  props.isLoadingAfterSearch && (
                    <div
                      style={{
                        color: "white",
                        marginBottom: "150px",
                        fontSize: "24px",
                      }}
                    >
                      아직 친구가 없습니다.
                    </div>
                  )}
                {props.keyword && !props.data?.searchFriend.length && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#fe259b",
                        fontSize: "24px",
                        marginBottom: "20px",
                      }}
                    >
                      {`"${props.keyword}"`}
                    </p>
                    <div
                      style={{
                        color: "white",
                        fontSize: "24px",
                        marginBottom: "4px",
                      }}
                    >
                      해당 키워드와 일치하는
                    </div>
                    <div
                      style={{
                        color: "white",
                        marginBottom: "150px",
                        fontSize: "24px",
                      }}
                    >
                      검색 결과가 없습니다.
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        <S.InfiniteScrollWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={props.hasMore}
            useWindow={false}
          >
            {props.data?.searchFriend.map((el) => (
              <div key={uuidv4()}>
                <ListItem
                  rightChildren={
                    <div
                      style={{
                        width: "120px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "1px" }}></div>
                      {el.userActive === 1 && (
                        <div style={{ color: "#C7C7C7" }}>오프라인</div>
                      )}
                      {el.userActive === 2 && (
                        <div style={{ color: "#00B8FF" }}>게임중</div>
                      )}
                      {!el.userActive && (
                        <div style={{ color: "#03FF49" }}>온라인</div>
                      )}
                      <img
                        onClick={props.onClickReplay(el.userId)}
                        style={{ width: "28px" }}
                        src="/icon/replay.png"
                      />
                    </div>
                  }
                >
                  <ProfileCard
                    character={el.character}
                    nickname={el.nickname}
                    hilightNickname={props.keyword}
                    online={el.userActive === 0 || el.userActive === 2}
                    offline={el.userActive === 1}
                    tier={el.userTier}
                  >
                    <S.Mmr>{Number(el.userMmr)}</S.Mmr>
                  </ProfileCard>
                </ListItem>
              </div>
            )) ?? <div></div>}
          </InfiniteScroll>
        </S.InfiniteScrollWrapper>
      </S.Container>

      <Button
        buttonType={buttonType.EMPTY}
        text="나가기"
        isFixedAtBottom
        onClick={props.onClickExit}
      />
    </>
  );
}
