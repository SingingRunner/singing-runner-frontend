import { useRouter } from "next/router";
import SignupUI from "./initial.presenter";
import { IInitialUIProps } from "./initial.types";

export default function Initial() {

  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const router = useRouter();

  const props: IInitialUIProps = {
    handleSignupClick,
    handleLoginClick,
  };

  return <SignupUI {...props} />;
}
