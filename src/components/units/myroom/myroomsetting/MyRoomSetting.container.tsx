import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../../commons/store";
import MyRoomSettingUI from './MyRoomSetting.presenter';
import { IMyRoomSettingUIProps } from './MyRoomSetting.types';

const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      userId
      userEmail
      nickname
      userActive
      userKeynote
      userMmr
      userPoint
      character
      userTier
    }
  }
`;

const LOGOUT_USER = gql`
  mutation Logout($userId: String!) {
    logout(userId: $userId)
  }
`;

export default function MyRoomSetting() {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo.userId;
  const { data } = useQuery(FETCH_USER, {
    variables: { userId },
  });
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [logoutUser] = useMutation(LOGOUT_USER);
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  // onClickSetting = () => {
  //   router.push("/myroom/setting");
  // };


  // 새로고침 시 닉네임이 안보이는 현상 없애기 위해 로컬스토리지에 저장
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  useEffect(() => {
    if (data?.fetchUser) {
      setNickname(data.fetchUser.nickname);
      localStorage.setItem("nickname", data.fetchUser.nickname);
    }
  }, [data]);

  const onClickLogout = () => {
    setIsLogoutClicked(true);
  }


  const onClickFinalLogout = async () => {
    try {
      await logoutUser({ 
        variables: { 
          userId 
        },
      });
      // 로그아웃 후 초기화면으로 이동
      router.push("/")
    } catch (error) {
      // 로그아웃 실패 시 에러메시지 출력
      console.log(error.message);
    }
  };

  const onClickExit = () => {
    router.back();
  };

  const props: IMyRoomSettingUIProps = {
    onClickExit,
    userData: { ...data?.fetchUser, nickname },
    onClickLogout,
    isLogoutClicked,
    onClickFinalLogout,
  };

  return <MyRoomSettingUI {...props} />;
}
