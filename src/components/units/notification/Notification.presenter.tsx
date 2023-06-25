import InfiniteScroll from "react-infinite-scroller";
import Button, { buttonType } from "../../commons/button/Button";
import * as S from "./Notification.styles";
import ListItem from "../../commons/listItem/ListItem";
import { v4 as uuidv4 } from "uuid";
import { INotificationUIProps } from './Notification.types';
import Label from '../../commons/label/Label';
import Modal from '../../commons/modal/Modal';

export default function NotificationUI(props: INotificationUIProps) {
  return (
    <>
    <Label text="알림 목록" marginTop="16px"/>
      <S.Container>
        <S.InfiniteScrollWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.getNotification.map((el) => (
              <div key={uuidv4()}>
                <ListItem
                  rightChildren={
                    <div
                      style={{
                        width: "170px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "60px", fontSize: "12px", marginLeft: "16px", color: "gray" }}>시간 전</div>
                      <Button 
                      buttonType={buttonType.SHORT_PINK} 
                      text="보기"
                      onClick={props.onClickCheck(el.senderId, el.senderNickname)} />
                    </div>
                  }
                  >
                    <p style={{color: "white"}}><span style={{color: "#FE259B"}}>{el.senderNickname}</span>님이 친구 요청을 보냈습니다.</p>
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
      {props.isCheckClicked && <Modal
        isCheck={false}
        hilightText={props.senderName}
        firstText='님이'
        secondText='친구 요청을 보냈어요!'
        buttonText='수락하기'
        leftButtonText='거절하기'
        onClickRight={props.onClickAccept}
        onClickLeft={props.onClickDeny}
      ></Modal>}
    </>
  );
}
