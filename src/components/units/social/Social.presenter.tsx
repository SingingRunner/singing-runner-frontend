import InfiniteScroll from "react-infinite-scroller";
import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import Input, { inputType } from "../../commons/input/Input";
import ListItem from "../../commons/listItem/ListItem";
import { ISocialUIProps } from "./Social.types";

export default function SocialUI(props: ISocialUIProps) {
  return (
    <>
      <div style={{ height: "20px" }}>
        <img
          src="/icon/setting.png"
          onClick={props.onClickSetting}
          style={{
            width: "40px",
            height: "40px",
            marginTop: "-68px",
            marginLeft: "292px",
            marginBottom: "48px",
          }}
        />
      </div>

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
          style={{ position: "relative", width: "100%", marginTop: "-620px" }}
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
            height: "40px",
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
              <div key={el._id}>
                <span style={{ margin: "10px" }}>{el.nickname}</span>
                <span style={{ margin: "10px" }}>{el.userMmr}</span>
                <span style={{ margin: "10px" }}>{el.userTier}</span>
              </div>
            ))}
          </InfiniteScroll>
          <img
            src="/icon/replay.png"
            style={{ height: "24px", marginLeft: "280px", marginTop: "16px" }}
            onClick={props.onClickReplay}
          />
          <ListItem
            buttonType={buttonType.SHORT}
            buttonText="이 부분 버튼 없어야함"
          ></ListItem>
        </div>
      </div>

      <ButtonWrapper>
        <Button
          buttonType={buttonType.EMPTY}
          text="나가기"
          onClick={props.onClickExit}
        />
      </ButtonWrapper>
    </>
  );
}
