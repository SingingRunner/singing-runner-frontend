import InfiniteScroll from "react-infinite-scroller";
import Button, { buttonType } from "../../../commons/button/Button";
import Input, { inputType } from "../../../commons/input/Input";
import ListItem from "../../../commons/listItem/ListItem";
import ProfileCard from "../../../commons/profileCard/ProfileCard";
import { v4 as uuidv4 } from "uuid";
import * as S from "../Social.styles";
import Label from "../../../commons/label/Label";
import { IAddUIProps } from "./Add.types";
import Modal from "../../../commons/modal/Modal";
import Header from '../../../commons/layout/header/Header';

export default function AddUI(props: IAddUIProps) {
  return (
    <>
    <Header
      text="친구 추가"
    />
      <S.Container>

        <S.InputWrapper>
          <S.SearchIcon src="/icon/search-purple.png" />
          <Input
            inputType={inputType.SEARCH}
            type="text"
            placeholder="닉네임으로 검색하세요"
            onChange={props.onChangeNickname}
          />
          <Label text="유저 목록" marginTop="16px" />
        </S.InputWrapper>
        {!props.keyword && <div style={{color: "white", marginBottom: "150px", fontSize: "24px"}}>닉네임으로 검색하세요.</div>}
        {props.keyword && !props.data?.searchUser.length && (<div style={{color: "white", marginBottom: "150px", fontSize: "24px"}}>검색 결과가 없습니다.</div>)}
        <S.InfiniteScrollWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.searchUser.map((el) => (
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
                      <Button
                        buttonType={buttonType.SHORT_PINK}
                        text="친구 요청"
                        onClick={props.handleAddRequest(el.nickname, el.userId)}
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
                  ></ProfileCard>
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
      {props.isRequestClicked && (
        <Modal
          isCheck={true}
          firstText={`${props.receiverNickname}님에게`}
          secondText="친구 요청을 보냈어요!"
          buttonText="확인"
          onClickRight={props.onClickModalCheck}
        ></Modal>
      )}
    </>
  );
}
