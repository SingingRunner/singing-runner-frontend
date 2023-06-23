import * as S from "./ProfileCard.styles";

interface IProfileCardProps {
  character: string;
  online?: boolean;
  offline?: boolean;
  add?: boolean;
  nickname?: string;
  tier?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  margin?: string;
}

export default function ProfileCard(props: IProfileCardProps) {
  const onClickAddFriend = () => {
    // if (!props.add) return;
  };

  return (
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
  );
}
