import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import StartingUI from "./Starting.presenter";
import { IStartingUIProps } from "./Starting.types";

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

export default function Starting() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [updateCharacterMutation] = useMutation(UPDATE_CHARACTER);
  const [userId] = useRecoilState(userIdState);
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId") || "");
  // }, []);
  const { data } = useQuery(FETCH_USER, {
    variables: { userId },
  });

  const router = useRouter();

  const onClickComplete = () => {
    updateCharacterMutation({
      variables: {
        userId,
        character: characters[currentImageIndex],
      },
    })
      .then((result) => {
        // Handle the result if needed
        console.log(data);
        console.log("success userId: ", userId);
        console.log("success character: ", characters[currentImageIndex]);
        console.log(result.data);
      })
      .catch((error) => {
        // Handle any errors
        console.log("failure userId: ", userId);
        console.log("failure character: ", characters[currentImageIndex]);
        console.error(error);
      });

    router.push("/main");
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % characters.length);
    console.log(characters[currentImageIndex]);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + characters.length) % characters.length
    );
  };

  const props: IStartingUIProps = {
    onClickComplete,
    handlePreviousImage,
    handleNextImage,
    characters,
    currentImageIndex,
  };

  return <StartingUI {...props} />;
}
