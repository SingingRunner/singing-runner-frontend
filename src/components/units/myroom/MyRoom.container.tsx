import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../commons/store";
import MyRoomUI from "./MyRoom.presenter";
import { IMyRoomUIProps } from './MyRoom.types';

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
    }
  }
`;

export default function MyRoom() {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo.userId;
  const { data } = useQuery(FETCH_USER, {
    variables: { userId },
  });

  const router = useRouter();
  const [nickname, setNickname] = useState("");

  const onClickSetting = () => {
    router.push("/myroom/setting");
  };


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

  const onClickComplete = () => {
    router.push("/main");
  };

  const props: IMyRoomUIProps = {
    onClickComplete,
    userData: { ...data?.fetchUser, nickname },
    onClickSetting,
  };

  return <MyRoomUI {...props} />;
}
