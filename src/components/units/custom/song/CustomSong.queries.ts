import { gql } from "@apollo/client";

export const SEARCH_SONG_QUERY = gql`
  query SearchSong($keyword: String!, $page: Int!, $filter: String!) {
    searchSong(keyword: $keyword, page: $page, filter: $filter) {
      songTitle
      singer
    }
  }
`;
