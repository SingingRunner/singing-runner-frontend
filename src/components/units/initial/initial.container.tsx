import { useRouter } from "next/router";
import SignupUI from "./initial.presenter";
import { IInitialUIProps } from "./initial.types";

export default function Initial() {
  // const [isSignupClicked, setIsSignupClicked] = useState(false);

  // const dummyClick = () => {
  //   console.log("dummy");
  // };

  const handleSignupClick = () => {
    router.push("/signup")
  };

  const handleLoginClick = () => {
    router.push("/login")
  };

  const router = useRouter();
  
  // const handleChangeAddress = () => {
  //   // 메인 화면으로 전환
  //   router.push("/main");
  // };

  const props: IInitialUIProps = {
    handleSignupClick,
    handleLoginClick,
  };

  return <SignupUI {...props} />;
}
