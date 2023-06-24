import { useRouter } from "next/router";
import Button, { buttonType } from "../../../commons/button/Button";
import Input, { inputType } from "../../../commons/input/Input";
import Label from "../../../commons/label/Label";
import Header from "../../../commons/layout/header/Header";
import ListItem from "../../../commons/listItem/ListItem";
import ProfileCard from "../../../commons/profileCard/ProfileCard";
import { ICustomInviteUIProps } from "./CustomInvite.types";
import NoData from "../../../commons/noData/NoData";
import { v4 as uuidv4 } from "uuid";

export default function CustomInviteUI(props: ICustomInviteUIProps) {
  const router = useRouter();
  return (
    <>
      <Header text="초대하기" />

      <Input
        inputType={inputType.SEARCH}
        placeholder="닉네임으로 검색하세요"
        searchIcon
        value={props.keyword}
        onChange={props.onChangeKeyword}
      />

      <Label text="친구 목록" marginTop="16px" />

      {props.data?.searchFriend.length ? (
        props.data?.searchFriend.map((el) => {
          const userActive =
            el.userActive === 0
              ? "초대하기"
              : el.userActive === 1
              ? "오프라인"
              : "게임중";
          return (
            <ListItem
              key={uuidv4()}
              buttonText={userActive}
              buttonType={
                userActive === "초대하기"
                  ? buttonType.SHORT_PINK
                  : buttonType.SHORT_DISABLED
              }
              onClick={() => {
                if (userActive !== "초대하기") return;
                props.onClickInvite(el.userId);
              }}
            >
              <ProfileCard
                character={el.character}
                nickname={el.nickname}
                hilightNickname={props.keyword}
                tier={el.userTier}
                margin="12px 0"
                online={el.userActive === 0 || el.userActive === 2}
                offline={el.userActive === 1}
              />
            </ListItem>
          );
        })
      ) : (
        <NoData />
      )}

      <Button
        buttonType={buttonType.GRADATION}
        text="완료"
        isFixedAtBottom
        onClick={() => router.back()}
      />
    </>
  );
}
