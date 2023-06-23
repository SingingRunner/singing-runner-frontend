// import { IReplayUIProps } from "./Replay.types";
import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import InfiniteScroll from "react-infinite-scroller";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../commons/store";
import { useRouter } from "next/router";
import ListItem from "../../commons/listItem/ListItem";
import * as S from "./Replay.styles";

export default function ReplayUI() {
  const userInfo = useRecoilValue(userInfoState);
  const currentId = userInfo.userId;
  const router = useRouter();
  const { userId } = router.query;
  const isMyReplay = currentId === userId;
  const onLoadMore = () => {
    console.log("onLoadMore");
  };

  return (
    <>
      {isMyReplay ? (
        <img
          onClick={() => console.log("click!")}
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
      <InfiniteScroll loadMore={onLoadMore}>
        <S.Container>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#C7C7C7",
            }}
          ></div>
        </S.Container>
      </InfiniteScroll>
      <ButtonWrapper>
        <Button buttonType={buttonType.EMPTY} text="선택 완료" />
      </ButtonWrapper>
    </>
  );
}
