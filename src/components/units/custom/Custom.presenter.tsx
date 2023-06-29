import { useRouter } from "next/router";
import Button, { buttonType } from "../../commons/button/Button";
import Header from "../../commons/layout/header/Header";
import Modal from "../../commons/modal/Modal";
import ProfileCard from "../../commons/profileCard/ProfileCard";
import * as S from "./Custom.styles";
import { ICustomUIProps } from "./Custom.types";
import Label from "../../commons/label/Label";
import { v4 as uuidv4 } from "uuid";
// import VoiceChat from "./chat/Chat";

export default function CustomUI(props: ICustomUIProps) {
  const router = useRouter();
  return (
    <>
      {props.isSongModalOpen && (
        <Modal
          firstText="노래를 선택해주세요"
          buttonText="확인"
          onClickRight={() => props.setIsSongModalOpen(false)}
        />
      )}
      {props.isNotHostModalOpen && (
        <Modal
          firstText="방 설정은 방장만 변경할 수 있어요"
          buttonText="확인"
          onClickRight={() => props.setIsNotHostModalOpen(false)}
        />
      )}
      {props.isPrevModalOpen && props.isHost && (
        <Modal
          firstText="생성 중인 방을 삭제하시겠어요?"
          buttonText="확인"
          leftButtonText="취소"
          onClickRight={props.onClickExit}
          onClickLeft={() => props.setIsPrevModalOpen(false)}
        />
      )}
      {props.isPrevModalOpen && !props.isHost && (
        <Modal
          firstText="정말로 나가시겠어요?"
          buttonText="확인"
          leftButtonText="취소"
          onClickRight={props.onClickExit}
          onClickLeft={() => props.setIsPrevModalOpen(false)}
        />
      )}
      <Header
        text="커스텀 모드"
        onClickPrev={() => props.setIsPrevModalOpen(true)}
      />
      {/* {props.roomInfo.roomId && (
        <VoiceChat roomId={String(props.roomInfo.roomId)} />
      )} */}

      <S.PlayersWrapper>
        {props.roomInfo.players.map((el, index) => {
          if (index < 3) {
            return (
              <S.JoinedPlayer key={uuidv4()}>
                <ProfileCard
                  character={el.character}
                  nickname={el.nickname}
                  tier={el.userTier}
                  margin="0 0 0 20px"
                  add={!el.isFriend && el.userId !== props.userId}
                  friendId={el.userId}
                >
                  {el.isHost && <S.Host>방장</S.Host>}
                </ProfileCard>
              </S.JoinedPlayer>
            );
          } else {
            console.log(
              "🚨에러!! 유저 정보가 3명보다 많음, 플레이어 정보: ",
              props.roomInfo.players
            );
            return <></>;
          }
        })}
        {3 - props.playersData.length > 0 && (
          <S.EmptyPlayer
            key={uuidv4()}
            onClick={() => router.push("/custom/invite")}
          >
            + 초대하기
          </S.EmptyPlayer>
        )}
      </S.PlayersWrapper>
      <S.SettingWrapper>
        <Label text="게임 모드" />
        <Button
          onClick={props.onClickMode}
          buttonType={buttonType.SELECT}
          text={props.roomInfo.mode}
        />
      </S.SettingWrapper>
      <S.SettingWrapper>
        <Label text="노래 선택" />
        {!props.roomInfo.songTitle ? (
          <Button
            onClick={props.onClickSong}
            buttonType={buttonType.SEARCH}
            text="노래 찾기"
          />
        ) : (
          <Button onClick={props.onClickSong} buttonType={buttonType.ONECOLOR}>
            <S.SongButtonWrapper>
              <S.SearchIcon src="/icon/search.png" />
              <S.Song>
                <S.Singer>{props.roomInfo.singer}</S.Singer>
                <S.Title>{props.roomInfo.songTitle}</S.Title>
              </S.Song>
              <S.Empty></S.Empty>
            </S.SongButtonWrapper>
          </Button>
        )}
      </S.SettingWrapper>

      {/* 게임 시작 버튼은 방장에게만 노출 */}
      {props.isHost &&
        (!props.roomInfo.songTitle ? (
          <Button
            buttonType={buttonType.DISABLED}
            text="게임 시작"
            isFixedAtBottom
            onClick={() => props.setIsSongModalOpen(true)}
          />
        ) : (
          <Button
            buttonType={buttonType.GRADATION}
            text="게임 시작"
            isFixedAtBottom
            onClick={props.onClickGameStart}
          />
        ))}
    </>
  );
}
