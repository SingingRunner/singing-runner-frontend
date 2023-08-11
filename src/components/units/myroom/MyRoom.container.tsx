import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import MyRoomUI from "./MyRoom.presenter";
import { IMyRoomUIProps } from "./MyRoom.types";
import { FETCH_USER, UPDATE_CHARACTER } from "./MyRoom.queries";
import { S3_PATH } from "../../../commons/constants/Constants";

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

export default function MyRoom() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [character, setCharacter] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [updateCharacterMutation] = useMutation(UPDATE_CHARACTER);
  const [tier, setTier] = useState("");
  const [mmr, setMmr] = useState(0);
  const [userId] = useRecoilState(userIdState);

  const { data } = useQuery(FETCH_USER, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.fetchUser) {
      setNickname(data.fetchUser.nickname);
      setCharacter(data.fetchUser.character);
      setTier(data.fetchUser.userTier);
      setMmr(data.fetchUser.userMmr);
      const characterIndex = characters.findIndex(
        (char) => char === data.fetchUser.character
      );
      setCurrentImageIndex(characterIndex);
    }
  }, [data]);

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

    router.replace("/main");
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

  const props: IMyRoomUIProps = {
    onClickComplete,
    userData: { ...data?.fetchUser, nickname },
    characters,
    currentImageIndex,
    handlePreviousImage,
    handleNextImage,
    character,
    tier,
    mmr,
  };

  return <MyRoomUI {...props} />;
}
