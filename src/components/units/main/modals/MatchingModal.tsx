import * as S from "../Main.styles";
import { IMainUIProps } from "../Main.types";

export default function MatchingModal(props: IMainUIProps) {
  return (
    <>
      <S.ModalBackground>
        <S.ModalWrapper>
          <S.ImageWrapper>
            <S.ImageEllipse src="/images/Ellipse.png" />
            <S.ImageVector src="/images/Vector.png" />
          </S.ImageWrapper>
          <S.ModalMatchComplete>매칭이 완료되었습니다.</S.ModalMatchComplete>
          <S.ModalMatchSongArtist>
            {/* {props.singer ? props.singer : "강산에"} */}
            Various Artists
          </S.ModalMatchSongArtist>
          <S.MarqueeContainer>
            <S.MarqueeContent>
              <S.ModalMatchSongTitle>
                {/* {props.songTitle
                      ? props.songTitle
                      : "거꾸로 강을 거슬러 오르는 저 힘찬 연어들처럼"} */}
                {"짱구는 못말려 오프닝(99년도 비디오판)"}
              </S.ModalMatchSongTitle>
              <S.ModalMatchSongTitle>
                {/* {props.songTitle
                      ? props.songTitle
                      : "거꾸로 강을 거슬러 오르는 저 힘찬 연어들처럼"} */}
                {"짱구는 못말려 오프닝(99년도 비디오판)"}
              </S.ModalMatchSongTitle>
            </S.MarqueeContent>
          </S.MarqueeContainer>
          <S.MatchButtonWrapper>
            <S.MatchDenyButton onClick={props.handleMatchDecline}>
              거절하기
            </S.MatchDenyButton>
            <S.MatchAcceptButton onClick={props.handleMatchAccept}>
              참여하기
            </S.MatchAcceptButton>
          </S.MatchButtonWrapper>
        </S.ModalWrapper>
      </S.ModalBackground>
    </>
  );
}
