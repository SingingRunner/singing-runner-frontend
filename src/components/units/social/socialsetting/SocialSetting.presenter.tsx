import InfiniteScroll from "react-infinite-scroller";
import { ISocialSettingUIProps } from "./SocialSetting.types";
import Button, { buttonType } from "../../../commons/button/Button";
import Input, { inputType } from "../../../commons/input/Input";
import ListItem from "../../../commons/listItem/ListItem";
import ProfileCard from "../../../commons/profileCard/ProfileCard";
import { v4 as uuidv4 } from "uuid";
import * as S from "../Social.styles";
import Label from "../../../commons/label/Label";
import Header from '../../../commons/layout/header/Header';
import Modal from '../../../commons/modal/Modal';

export default function SocialSettingUI(props: ISocialSettingUIProps) {
  return (
    <>
    <Header
      text="친구 관리"
    />
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
        {!props.keyword && !props.data?.searchFriend.length && (<div style={{color: "white", marginBottom: "150px", fontSize: "24px"}}>표시할 친구가 없습니다.</div>)}
        {props.keyword && !props.data?.searchFriend.length && (<div style={{color: "white", marginBottom: "150px", fontSize: "24px"}}>검색 결과가 없습니다.</div>)}
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
                      buttonType={buttonType.SHORT_GRAY} 
                      text="삭제"
                      onClick={props.onClickDelete(el.userId)} />
                    </div>
                  }
                >
                  <ProfileCard
                    character={el.character}
                    nickname={el.nickname}
                    hilightNickname={props.keyword}
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
      {props.isDeleteClicked && (
        <Modal
          isCheck={false}
          firstText="정말로 삭제하시겠습니까?"
          buttonText='확인'
          leftButtonText='취소'
          onClickRight={props.handelDelete}
          onClickLeft={props.onClickCancel}
        />)}
    </>
  );
}
