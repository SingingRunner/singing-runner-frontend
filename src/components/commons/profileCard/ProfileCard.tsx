import { useMutation } from "@apollo/client";
import * as S from "./ProfileCard.styles";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import Modal from "../modal/Modal";
import { IProfileCardProps } from "./ProfileCard.types";
import { ADD_FRIEND } from "./ProfileCard.queries";

export default function ProfileCard(props: IProfileCardProps) {
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const [addFriend] = useMutation(ADD_FRIEND);
  const [addFrinedModalIsOpen, setAddFriendModalIsOpen] = useState(false);

  const onClickAddFriend = () => {
    if (!props.add) return;
    addFriend({
      variables: {
        addFriendDto: {
          userId,
          friendId: props.friendId,
        },
      },
    });
    setAddFriendModalIsOpen(true);
  };

  return (
    <>
      {addFrinedModalIsOpen && (
        <Modal
          buttonText="확인"
          isCheck
          hilightText={props.nickname}
          firstText="님에게"
          secondText="친구 요청을 보냈어요!"
          onClickRight={() => setAddFriendModalIsOpen(false)}
        />
      )}
      <S.Wrapper style={{ margin: props.margin }}>
        <S.ImgWrapper onClick={onClickAddFriend}>
          <S.Img src={`/game/player/profile/${props.character}.png`} />
          {props.add && <S.AddIcon src="/icon/add.png" />}
          {props.online && <S.OnlineIcon />}
          {props.offline && <S.OfflineIcon />}
        </S.ImgWrapper>
        {props.nickname && <S.Nickname>{props.nickname}</S.Nickname>}
        {props.tier && <S.Tier src={`/tier/${props.tier}.png`} />}
        {props.children && props.children}
      </S.Wrapper>
    </>
  );
}
