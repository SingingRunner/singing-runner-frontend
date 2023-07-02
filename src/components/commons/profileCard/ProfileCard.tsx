import { useMutation } from "@apollo/client";
import * as S from "./ProfileCard.styles";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import Modal from "../modal/Modal";
import { IProfileCardProps } from "./ProfileCard.types";
import { FRIEND_REQUEST } from "./ProfileCard.queries";
import { v4 as uuidv4 } from "uuid";

export default function ProfileCard(props: IProfileCardProps) {
  const [userId] = useRecoilState(userIdState);

  const [friendRequest] = useMutation(FRIEND_REQUEST);
  const [frienedRequestModalIsOpen, setFriendRequestModalIsOpen] =
    useState(false);

  const onClickAddFriend = () => {
    if (!props.add) return;
    friendRequest({
      variables: {
        notificationDto: {
          userId: props.friendId,
          senderId: userId,
        },
      },
    });
    setFriendRequestModalIsOpen(true);
  };

  return (
    <>
      {frienedRequestModalIsOpen && (
        <Modal
          buttonText="확인"
          isCheck
          hilightText={props.nickname}
          firstText="님에게"
          secondText="친구 요청을 보냈어요!"
          onClickRight={() => setFriendRequestModalIsOpen(false)}
        />
      )}
      <S.Wrapper style={{ margin: props.margin }}>
        <S.ImgWrapper onClick={onClickAddFriend}>
          <S.Img src={`/game/player/profile/${props.character}.png`} />
          {props.add && <S.AddIcon src="/icon/add.png" />}
          {props.online && <S.OnlineIcon />}
          {props.offline && <S.OfflineIcon />}
        </S.ImgWrapper>
        {props.hilightNickname && props.nickname && (
          <S.NicknameWrapper>
            {props.nickname
              .replaceAll(
                props.hilightNickname,
                `!@#$${props.hilightNickname}!@#$`
              )
              .split("!@#$")
              .map((word) => (
                <S.Nickname
                  key={uuidv4()}
                  isMatched={props.hilightNickname?.trim() === word}
                >
                  {word}
                </S.Nickname>
              ))}
          </S.NicknameWrapper>
        )}
        {!props.hilightNickname && props.nickname && (
          <S.NicknameWrapper>{props.nickname}</S.NicknameWrapper>
        )}
        {props.tier && <S.Tier src={`/tier/${props.tier}.png`} />}
        {props.children && props.children}
      </S.Wrapper>
    </>
  );
}
