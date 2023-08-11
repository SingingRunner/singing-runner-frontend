import styled from "@emotion/styled";
import Header from "../../../src/components/commons/layout/header/Header";
import Button, {
  buttonType,
} from "../../../src/components/commons/button/Button";
import { useRouter } from "next/router";
import { S3_PATH } from "../../../src/commons/constants/Constants";

const gameItems = [
  {
    title: "눈사람",
    image: `${S3_PATH}/game/item/frozen.png`,
    description: [
      { isBold: true, text: "눈사람으로 변합니다" },
      {
        label: "효과",
        text: "점수가 30% 차감됩니다.",
      },
      {
        label: "종료",
        text: "눈사람을 부셔서 탈출하세요!",
      },
      {
        label: "범위",
        text: "나 빼고 적용",
      },
    ],
  },
  {
    title: "음소거",
    image: `${S3_PATH}/game/item/mute.png`,
    description: [
      { isBold: true, text: "마이크가 고장나서 정신을 잃습니다" },
      {
        label: "효과",
        text: "점수가 30% 차감됩니다.",
      },
      {
        label: "종료",
        text: "8초 뒤 해제",
      },
      {
        text: "크게 소리를 지르면 더 빨리 탈출할 수 있어요!",
        fontWeight: "200",
      },
      {
        label: "범위",
        text: "나 빼고 적용",
      },
    ],
  },
  {
    title: "먹구름",
    image: `${S3_PATH}/game/item/cloud.png`,
    description: [
      { isBold: true, text: "먹구름이 몰려와 가사를 가립니다" },
      {
        label: "효과",
        text: "손으로 움직여서 가사를 확인하세요!",
      },
      {
        label: "종료",
        text: "8초 뒤 해제",
      },

      {
        label: "범위",
        text: "나 빼고 적용",
      },
    ],
  },
  {
    title: "슈퍼맨",
    image: `${S3_PATH}/game/item/super.png`,
    description: [
      { isBold: true, text: "캐릭터가 거대해지고 데굴데굴 굴러갑니다" },
      {
        label: "효과",
        text: "점수가 50% 증가하며,",
      },
      {
        text: "키 변경을 제외한 모든 상태 이상을 해제합니다.",
      },
      {
        label: "종료",
        text: "8초 뒤 해제",
      },
      {
        label: "범위",
        text: " 나에게만 적용",
      },
    ],
  },
  {
    title: "키 Up",
    image: `${S3_PATH}/game/item/keyUp.png`,
    description: [
      { isBold: true, text: "3키 높아진 반주에 맞추어 노래해주세요" },

      {
        label: "종료",
        text: "8초 뒤 해제",
      },
      {
        label: "범위",
        text: " 모두에게 적용",
      },
    ],
  },
  {
    title: "키 Down",
    image: `${S3_PATH}/game/item/keyDown.png`,
    description: [
      { isBold: true, text: "3키 낮아진 반주에 맞추어 노래해주세요" },

      {
        label: "종료",
        text: "8초 뒤 해제",
      },
      {
        label: "범위",
        text: " 모두에게 적용",
      },
    ],
  },
];

export default function ManualPage() {
  const router = useRouter();
  return (
    <>
      <Header text="아이템 설명" />
      <Wrapper>
        {gameItems.map((item, index) => (
          <Item key={index} isOdd={index % 2 !== 0}>
            <Title>
              <img src={item.image} />
              {item.title}
            </Title>
            <TextWrapper>
              {item.description.map((desc, index) => (
                <Text key={index} isBold={desc.isBold}>
                  {desc.label && <Label type={desc.label}>{desc.label}</Label>}
                  {desc.text}
                </Text>
              ))}
            </TextWrapper>
          </Item>
        ))}
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

const Wrapper = styled.div`
  height: calc((var(--vh, 1vh) * 100) - 140px);
  padding-top: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 28px 10px;
  padding: 8px 16px 20px;
  width: calc(100% - 20px);
  border-radius: 12px;
  border: 2px solid #fff;
  box-shadow: inset 0px 0px 10px 1.5px #fff, 0px 0px 10px 1.5px #fff;
  ${(props: { isOdd?: boolean }) =>
    props.isOdd &&
    `box-shadow: inset 0px 0px 10px 1.5px #e8cb50, 0px 0px 10px 1.5px #e8cb50;
    border: 2px solid #e8cb50;
    `}
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 60px;
    margin-right: 4px;
  }
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-left: -24px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  line-height: 24px;
  font-size: ${(props: { isBold?: boolean }) =>
    props.isBold ? "16px" : "14px"};
  font-weight: ${(props: { isBold?: boolean }) => (props.isBold ? 700 : 400)};
  color: ${(props: { isBold?: boolean }) =>
    props.isBold ? "#E8CB50" : "#fff"};
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 16px;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  margin: 4px 8px 4px 0;
  line-height: 16px;

  ${(props: { type: string }) => {
    switch (props.type) {
      case "효과":
        return "background: #50bee8;";
      case "종료":
        return "background: #f16666;";
      case "범위":
        return "background: #e8cb50;";
      default:
        return "";
    }
  }}
`;
