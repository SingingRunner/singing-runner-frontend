import styled from "@emotion/styled";
import Header from "../../../src/components/commons/layout/header/Header";
import Button, {
  buttonType,
} from "../../../src/components/commons/button/Button";
import { useRouter } from "next/router";

export default function ManualPage() {
  const router = useRouter();
  return (
    <>
      <Header text="아이템 설명" />
      <Wrapper>
        <Item>
          <img src="/game/item/frozen.png" />
          <TextWrapper>
            <p>캐릭터가 눈사람으로 변해버립니다.</p>
            <p>눈사람을 두드려서 탈출하세요!</p>
          </TextWrapper>
        </Item>
        <Item>
          <img src="/game/item/cloud.png" />
          <TextWrapper>
            <p>먹구름이 가사를 가립니다.</p>
            <p>손으로 움직여서 가사를 확인하세요!</p>
          </TextWrapper>
        </Item>
        <Item>
          <img src="/game/item/mute.png" />
          <TextWrapper>
            <p>마이크가 고장나서 속도가 느려집니다.</p>
            <p>소리를 지르면 더 빨리 탈출할 수 있어요!</p>
          </TextWrapper>
        </Item>
        <Item>
          <img src="/game/item/keyUp.png" />
          <TextWrapper>
            <p>3키 높아진 반주에 맞추어 노래해주세요.</p>
          </TextWrapper>
        </Item>
        <Item>
          <img src="/game/item/keyDown.png" />
          <TextWrapper>
            <p>3키 낮아진 반주에 맞추어 노래해주세요.</p>
          </TextWrapper>
        </Item>
      </Wrapper>
      <Button
        buttonType={buttonType.EMPTY}
        text="나가기"
        onClick={() => router.push("/main")}
        isFixedAtBottom
      />
    </>
  );
}

const Wrapper = styled.div``;
const Item = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 60px;
    margin-right: 6px;
  }
  p {
    color: #fff;
    font-size: 14px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
