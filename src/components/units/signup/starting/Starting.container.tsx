import { useRouter } from "next/router";
import StartingUI from './Starting.presenter';

export default function Starting() {

  const router = useRouter();

  const handleCharacterChooseClick = () => {
    router.push("/main");
  };

  const props = {
    handleCharacterChooseClick,
  };

  return <StartingUI {...props} />;
}
