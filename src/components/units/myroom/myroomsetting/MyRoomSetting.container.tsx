import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState, userIdState } from "../../../../commons/store";
import MyRoomSettingUI from "./MyRoomSetting.presenter";
import { IMyRoomSettingUIProps } from "./MyRoomSetting.types";
import {
  FETCH_USER,
  LOGOUT_USER,
  UPDATE_USER_KEYNOTE,
} from "./MyRoomSetting.queries";

const keynoteNames = ["ORIGINAL_KEY", "FEMALE_KEY", "MALE_KEY"];
const keynoteDisplayNames = ["원키", "여키", "남키"];

export default function MyRoomSetting() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data, refetch } = useQuery(FETCH_USER);
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [updateUserKeynote] = useMutation(UPDATE_USER_KEYNOTE);

  const onClickKeySetting = async () => {
    const totalKeynotes = 3; // 원키, 여키, 남키 총 3가지
    const currentIndex = Number(data?.fetchUser.userKeynote) || 0;
    const nextIndex = (currentIndex + 1) % totalKeynotes;
    const selectedKeynote = keynoteNames[nextIndex];

    try {
      await updateUserKeynote({
        variables: {
          userId,
          keynote: selectedKeynote,
        },
      });
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickReplay = () => {
    try {
      console.log("myId: ", userId);
      router.push({
        pathname: `/replay/${userId}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickLogout = () => {
    setIsLogoutClicked(true);
  };

  const onClickCancelLogout = () => {
    setIsLogoutClicked(false);
  };

  const onClickFinalLogout = async () => {
    try {
      // 액세스 토큰 제거
      setAccessToken("");
      await logoutUser({ variables: { userId } });
      setUserId("");
      localStorage.setItem("userId", "");
      // 로그아웃 후 초기화면으로 이동
      router.push("/");
    } catch (error) {
      // 로그아웃 실패 시 에러메시지 출력
      console.log(error.message);
      router.push("/");
    }
  };

  const onClickExit = () => {
    router.push("/myroom");
  };

  const displayKeynote = keynoteDisplayNames[data?.fetchUser?.userKeynote];

  const props: IMyRoomSettingUIProps = {
    onClickExit,
    userData: { ...data?.fetchUser },
    onClickLogout,
    isLogoutClicked,
    onClickFinalLogout,
    onClickCancelLogout,
    onClickReplay,
    onClickKeySetting,
    displayKeynote,
  };

  return <MyRoomSettingUI {...props} />;
}
