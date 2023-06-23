import { useRouter } from "next/router";
import SignupUI from "./Initial.presenter";
import { IInitialUIProps } from "./Initial.types";

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
