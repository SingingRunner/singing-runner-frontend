import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";

export default function WaitingModal(props: IMainUIProps) {
  return (
    <>
      <S.ModalBackground>
        <S.ModalWrapper>
          <S.ImageWrapper>
            <S.ImageEllipse src="/images/Ellipse.png" />
            <S.ImageVector src="/images/Vector.png" />
          </S.ImageWrapper>
          <S.ModalMatchComplete>
            다른 유저를 기다리는 중입니다.
          </S.ModalMatchComplete>
          <S.ModalMatchSongArtist>
            {console.log(props.singer)}
            {/* {props.singer ? props.singer : "TEST"} */}
            Various Artists
          </S.ModalMatchSongArtist>
          <S.MarqueeContainer>
            <S.MarqueeContent>
              <S.ModalMatchSongTitle>
                {console.log(props.songTitle)}
                {/* {props.songTitle ? props.songTitle : "TEST"} */}
                {"짱구는 못말려 오프닝(99년도 비디오판)"}
              </S.ModalMatchSongTitle>
              <S.ModalMatchSongTitle>
                {/* {props.songTitle ? props.songTitle : "TEST"} */}
                {"짱구는 못말려 오프닝(99년도 비디오판)"}
              </S.ModalMatchSongTitle>
            </S.MarqueeContent>
          </S.MarqueeContainer>
          {/* <button onClick={props.handleLoadingClick}>test</button> */}
        </S.ModalWrapper>
      </S.ModalBackground>
    </>
  );
}
