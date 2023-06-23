import { useRouter } from "next/router";
import SocialSettingUI from './SocialSetting.presenter';
import { ISocialSettingUIProps } from './SocialSetting.types';


export default function SocialSetting() {
  // 나가기 버튼 클릭 시 이전 페이지로 이동
  const exitClick = () => {
    router.back();
  };

  const router = useRouter();

  const props: ISocialSettingUIProps = {
    exitClick,
  };

  return <SocialSettingUI {...props} />;
}
