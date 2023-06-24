import { useRouter } from "next/router";
import Button, { buttonType } from "../../commons/button/Button";
import Header from "../../commons/layout/header/Header";
import Modal from "../../commons/modal/Modal";
import ProfileCard from "../../commons/profileCard/ProfileCard";
import * as S from "./Custom.styles";
import { ICustomUIProps } from "./Custom.types";
import Label from "../../commons/label/Label";
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
      {props.isPrevModalOpen && (
        <Modal
          firstText="생성 중인 방을 삭제하시겠어요?"
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
      <S.PlayersWrapper>
        <S.JoinedPlayer>
          <ProfileCard
            character="beluga"
            nickname="우주꼬맹단육"
            tier="bronze"
            margin="0 0 0 20px"
          >
            <S.Host>방장</S.Host>
          </ProfileCard>
        </S.JoinedPlayer>
        <S.JoinedPlayer>
          <ProfileCard
            character="beluga"
            nickname="우주꼬맹단육"
            tier="gold"
            add
            margin="0 0 0 20px"
            friendId="test"
          />
        </S.JoinedPlayer>
        <S.EmptyPlayer onClick={() => router.push("/custom/invite")}>
          + 초대하기
        </S.EmptyPlayer>
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
            onClick={() => router.push("/custom/song")}
            buttonType={buttonType.SEARCH}
            text="노래 찾기"
          />
        ) : (
          <Button
            onClick={() => router.push("/custom/song")}
            buttonType={buttonType.ONECOLOR}
          >
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
      {/* 노래 선택 전 */}
      {!props.roomInfo.songTitle ? (
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
      )}
    </>
  );
}
