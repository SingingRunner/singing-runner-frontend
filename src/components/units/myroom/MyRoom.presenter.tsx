import Button, { buttonType } from "../../commons/button/Button";
import ButtonWrapper from "../../commons/buttons/wrapper";
import { IMyRoomUIProps } from './MyRoom.types';
import * as S from "./MyRoom.styles";

export default function MyRoomUI(props: IMyRoomUIProps) {
  return (
    <>
    <img onClick={props.onClickSetting} style={{position: "absolute", height: "40px", width: "auto", top:"8px", right: "8px" }} src="/icon/setting.png"/>
    <div style={{display: "flex", width: "100%", position: "relative"}}>
      <img style={{position: "absolute", width: "46px", left: "4px", top: "-4px"}} src="/images/yellowcat.png" alt="logo" />
      <div style={{position: "absolute", top: "10px", left: "64px", fontSize: "16px", color: "white"}}>{props.userData?.nickname}</div>
      
      <div style={{position: "absolute", width: "80px", height: "auto", top: "-14px", right: "24px"}}>
        <div style={{position: "absolute", height: "14px", fontSize: "12px",top: "2px", right: "-18px", textShadow: "-1px 0 #1A1128, 0 1px #1A1128, 1px 0 #1A1128, 0 -1px #1A1128", color: "#DFF45B"}}>23984</div>
        <div style={{position: "absolute", top: "18px", fontSize: "24px", color: "#DCDCDC", fontFamily: "Pretendard-bold"}}>SILVER</div>
        <img src="/images/silvermic.png" style={{width: "16px", marginLeft:"84px", marginTop: "24px"}}/>
      </div>
    </div>
      <S.Container>
        <S.ImageWrapper>
          <S.ImageVectorLeft src="/images/Vector_left.png" alt="vector" />
          <S.ImageCharacter src="/images/cat.png" alt="logo" />
          <S.ImageVectorRight src="/images/Vector_right.png" alt="vector" />
        </S.ImageWrapper>
      </S.Container>
      <ButtonWrapper>
        <Button
          buttonType={buttonType.EMPTY}
          text="선택 완료"
          onClick={props.onClickComplete}
        />
      </ButtonWrapper>
    </>
  );
}
