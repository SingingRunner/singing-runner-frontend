import { useEffect, useRef } from "react";
import * as S from "./Button.styles";
import { S3_PATH } from "../../../commons/constants/Constants";
interface IButtonProps {
  buttonType: buttonType;
  text?: string;
  onClick?: () => void;
  isFixedAtBottom?: boolean; // 화면의 맨 밑에 붙어있는 버튼
  isFixedAtBottomSecond?: boolean; // 화면의 맨 밑에 있는 버튼 바로 위의 버튼
  children?: React.ReactNode;
  height?: string; // 버튼의 높이, default는 40px
}
export enum buttonType {
  "GRADATION",
  "EMPTY",
  "DISABLED",
  "ONECOLOR",
  "ONECOLOR_PINK",
  "SEARCH",
  "SELECT",
  "SHORT",
  "SHORT_SELECT",
  "SHORT_SELECT_EMPTY",
  "SHORT_PINK",
  "SHORT_GRAY",
  "SHORT_DISABLED",
  "FILTER",
  "TIMER",
}

export default function Button(props: IButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (
      [buttonType.DISABLED, buttonType.SHORT_DISABLED].includes(
        props.buttonType
      )
    )
      audioRef.current = new Audio(
        `${S3_PATH}/sound/effect/disabled_button.mp3`
      );
    else audioRef.current = new Audio(`${S3_PATH}/sound/effect/button.mp3`);
  }, []);

  return (
    <S.Button
      onClick={() => {
        if (props.onClick) {
          props.onClick();
          audioRef.current?.play();
        }
      }}
      buttonType={props.buttonType}
      isFixedAtBottom={props.isFixedAtBottom}
      isFixedAtBottomSecond={props.isFixedAtBottomSecond}
      height={props.height}
    >
      {props.buttonType === buttonType.SELECT ? (
        <>
          <S.SelectIcon src={`${S3_PATH}/icon/triangle.png`} alt="triangle" />
          {props.text}
          <S.SelectIcon
            isRight
            src={`${S3_PATH}/icon/triangle.png`}
            alt="triangle"
          />
        </>
      ) : [buttonType.SHORT_SELECT, buttonType.SHORT_SELECT_EMPTY].includes(
          props.buttonType
        ) ? (
        <>
          <S.SelectIcon
            small
            src={`${S3_PATH}/icon/triangle.png`}
            alt="triangle"
          />
          {props.text}
          <S.SelectIcon
            small
            isRight
            src={`${S3_PATH}/icon/triangle.png`}
            alt="triangle"
          />
        </>
      ) : props.buttonType === buttonType.SEARCH ? (
        <>
          <S.SearchIcon src={`${S3_PATH}/icon/search.png`} alt="triangle" />
          {props.text}
          <S.Empty />
        </>
      ) : props.buttonType === buttonType.FILTER ? (
        <>
          <S.SelectIcon
            small
            src={`${S3_PATH}/icon/triangle-black.png`}
            alt="triangle"
          />
          {props.text}
          <S.SelectIcon
            small
            isRight
            src={`${S3_PATH}/icon/triangle-black.png`}
            alt="triangle"
          />
        </>
      ) : (
        props.children ?? props.text
      )}
    </S.Button>
  );
}
