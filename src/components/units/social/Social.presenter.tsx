import InfiniteScroll from "react-infinite-scroller";
import Button, { buttonType } from "../../commons/button/Button";
import Input, { inputType } from "../../commons/input/Input";
import ListItem from "../../commons/listItem/ListItem";
import ProfileCard from "../../commons/profileCard/ProfileCard";
import { ISocialUIProps } from "./Social.types";
import { v4 as uuidv4 } from "uuid";
import * as S from "./Social.styles";
import Label from "../../commons/label/Label";

export default function SocialUI(props: ISocialUIProps) {
  return (
    <>
      <S.SettingIcon src="/icon/setting.png" onClick={props.onClickSetting} />

      <S.Container>
        <S.InputWrapper>
          <S.SearchIcon src="/icon/search-purple.png" />
          <Input
            inputType={inputType.SEARCH}
            type="text"
            placeholder="닉네임으로 검색하세요"
          />
          <Label text="친구 목록" marginTop="16px" />
        </S.InputWrapper>

        <S.InfiniteScrollWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.searchFriend.map((el) => (
              <div key={uuidv4()}>
                <ListItem
                  rightChildren={
                    <div style={{width: "120px", display:"flex", alignItems: "center", justifyContent: "space-between"}}>
                      <div style={{width: "1px"}}></div>
                      {el.userActive === 1 && <div style={{color: "#00B8FF"}}>온라인</div>}
                      {el.userActive === 2 && <div style={{color: "#03FF49"}}>게임중</div>}
                      {!el.userActive && <div style={{color: "#C7C7C7"}}>오프라인</div>}
                      <img onClick={props.onClickReplay} style={{width: "28px"}} src="/icon/replay.png" />
                    </div>
                  }
                >
                  <ProfileCard
                    character={el.character}
                    nickname={el.nickname}
                    online={el.userActive}
                    offline={!el.userActive}
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
