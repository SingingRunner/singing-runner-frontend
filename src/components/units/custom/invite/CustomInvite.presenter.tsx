import { useRouter } from "next/router";
import Button, { buttonType } from "../../../commons/button/Button";
import Input, { inputType } from "../../../commons/input/Input";
import Label from "../../../commons/label/Label";
import Header from "../../../commons/layout/header/Header";
import ListItem from "../../../commons/listItem/ListItem";
import ProfileCard from "../../../commons/profileCard/ProfileCard";

export default function CustomInviteUI() {
  const router = useRouter();
  return (
    <>
      <Header text="초대하기" />
      <Input
        inputType={inputType.SEARCH}
        placeholder="닉네임으로 검색하세요"
        searchIcon
      />
      <Label text="친구 목록" marginTop="16px" />

      <ListItem
        butonText="초대하기"
        buttonType={buttonType.SHORT_PINK}
        onClick={() => {}}
      >
        <ProfileCard
          character="beluga"
          nickname="벨루가"
          tier="bronze"
          margin="12px 0"
          online
        />
      </ListItem>

      <ListItem
        butonText="초대하기"
        buttonType={buttonType.SHORT_PINK}
        onClick={() => {}}
      >
        <ProfileCard
          character="beluga"
          nickname="벨루가"
          tier="silver"
          margin="12px 0"
          offline
        />
      </ListItem>

      <ListItem
        butonText="게임중"
        buttonType={buttonType.SHORT_DISABLED}
        onClick={() => {}}
      >
        <ProfileCard
          character="beluga"
          nickname="벨루가"
          tier="silver"
          margin="12px 0"
          offline
        />
      </ListItem>

      <Button
        buttonType={buttonType.GRADATION}
        text="완료"
        isFixedAtBottom
        onClick={() => router.back()}
      />
    </>
  );
}
