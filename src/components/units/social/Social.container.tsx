import { useRouter } from "next/router";
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";

export default function Social() {
  const router = useRouter();

  // 설정 버튼 클릭 시 설정 페이지로 이동
  const onClickSetting = () => {
    router.push("/social/setting");
  };

  // 리플레이 버튼 클릭 시 리플레이 페이지로 이동
  const onClickReplay = () => {
    router.push("/social/replay");
  };

  // 나가기 버튼 클릭 시 이전 페이지로 이동
  const onClickExit = () => {
    router.back();
  };


  const props: ISocialUIProps = {
    onClickSetting,
    onClickReplay,
    onClickExit,
  };

  return <SocialUI {...props} />;
}
