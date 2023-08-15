import { gql } from "@apollo/client";

export const PLAY_REPLAY = gql`
  query playReplay($replayId: Int!) {
    playReplay(replayId: $replayId) {
      userVocal
      gameEvent
      replayKeynote
      gameSong {
        songTitle
        singer
        songLyrics
        songGender
        songMale
        songMaleUp
        songMaleDown
        songFemale
        songFemaleUp
        songFemaleDown
      }
      characterList {
        userId
        character
      }
    }
  }
`;
