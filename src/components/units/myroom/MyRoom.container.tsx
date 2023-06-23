import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState } from "../../../commons/store";
import MyRoomUI from "./MyRoom.presenter";
import { IMyRoomUIProps } from './MyRoom.types';

const characters = [
  "beluga",
  "hare",
  "husky",
  "lynx",
  "narwhal",
  "puffin",
  "puma",
  "snowleopard",
];

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

const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($userId: String!, $character: String!) {
    updateCharacter(userId: $userId, character: $character) {
      userId
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [updateCharacterMutation] = useMutation(UPDATE_CHARACTER);
  const setUserInfo = useSetRecoilState(userInfoState);

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
      
      // 로그인 된 사용자의 아이디로 userInfo 업데이트
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        userId: data.fetchUser.userId,
        character: data.fetchUser.character,
      }));
    }
  }, [data, setUserInfo]);

  const onClickComplete = () => {
    // Call the mutation
  updateCharacterMutation({
    variables: {
      userId: userInfo.userId,
      character: characters[currentImageIndex]
    },
  })
    .then((result) => {
      // Handle the result if needed
      console.log("success userId: ", userInfo.userId)
      console.log("success character: ", characters[currentImageIndex])
      console.log(result.data);
    })
    .catch((error) => {
      // Handle any errors
      console.log("failure userId: ", userInfo.userId)
      console.log("failure character: ", characters[currentImageIndex])
      console.error(error);
    });

    router.push("/main");
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };
  
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
  };
  

  const props: IMyRoomUIProps = {
    onClickComplete,
    userData: { ...data?.fetchUser, nickname },
    onClickSetting,
    characters,
    currentImageIndex,
    handlePreviousImage,
    handleNextImage,
  };

  return <MyRoomUI {...props} />;
}
