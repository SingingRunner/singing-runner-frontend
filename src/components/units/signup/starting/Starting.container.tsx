import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../../commons/store";
import StartingUI from "./Starting.presenter";
import { UPDATE_CHARACTER } from "./Starting.queries";
import { IStartingUIProps } from "./Starting.types";
import { S3_PATH } from "../../../../commons/constants/Constants";

const characters = [
  "beluga",
  "hare",
  "husky",
  "lynx",
  "narwhal",
  "puffin",
  "puma",
  "leopard",
  "moose",
];

export default function Starting() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [updateCharacterMutation] = useMutation(UPDATE_CHARACTER);
  const [userId] = useRecoilState(userIdState);

  const router = useRouter();

  const onClickComplete = async () => {
    await updateCharacterMutation({
      variables: {
        userId,
        character: characters[currentImageIndex],
      },
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });

    router.push("/main");
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(`${S3_PATH}/sound/effect/pop.mp3`);
  }, []);

  const handleNextImage = () => {
    audioRef.current?.play();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  const handlePreviousImage = () => {
    audioRef.current?.play();
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
