import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import StartingUI from "./Starting.presenter";
import { FETCH_USER, UPDATE_CHARACTER } from './Starting.queries';
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

export default function Starting() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [updateCharacterMutation] = useMutation(UPDATE_CHARACTER);
  const [userId] = useRecoilState(userIdState);
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
