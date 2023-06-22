import { useRouter } from "next/router";
import StartingUI from './Starting.presenter';

export default function Starting() {

  const router = useRouter();

  const onClickComplete = () => {
    router.push("/main");
  };

  const props = {
    onClickComplete,
  };

  return <StartingUI {...props} />;
}
