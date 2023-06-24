import InfiniteScroll from "react-infinite-scroller";
import Button, { buttonType } from "../../commons/button/Button";
import Input, { inputType } from "../../commons/input/Input";
import ListItem from "../../commons/listItem/ListItem";
import ProfileCard from "../../commons/profileCard/ProfileCard";
import { ISocialUIProps } from "./Social.types";
import { v4 as uuidv4 } from "uuid";

export default function SocialUI(props: ISocialUIProps) {
  return (
    <>
      <img
        src="/icon/setting.png"
        onClick={props.onClickSetting}
        style={{
          position: "absolute",
          height: "40px",
          width: "auto",
          top: "8px",
          right: "8px",
        }}
      />
      <div
        style={{
          height: "100vh",
          backgroundColor: "#1A1128",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "fixed",
            width: "calc(100% - 32px)",
            top: "60px",
          }}
        >
          <img
            style={{
              position: "absolute",
              width: "20px",
              top: "10px",
              left: "12px",
            }}
            src="/icon/search-purple.png"
          />
          <Input
            inputType={inputType.SEARCH}
            type="text"
            placeholder="닉네임으로 검색하세요"
          />
          <div style={{ color: "white", marginTop: "16px" }}>친구 목록</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "54px",
            height: "540px",
            width: "100%",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.getFriendList.map((el) => (
              <div key={uuidv4()}>
                <ListItem rightChildren={<div>내용</div>}>
                  <ProfileCard
                    character={el.character}
                    nickname={el.nickname}
                  ></ProfileCard>
                </ListItem>
              </div>
            )) ?? <div></div>}
          </InfiniteScroll>
        </div>
      </div>
      <Button
        buttonType={buttonType.EMPTY}
        text="나가기"
        isFixedAtBottom
        onClick={props.onClickExit}
      />
    </>
  );
}
