import { gql } from "@apollo/client";

export const ADD_FRIEND = gql`
  mutation AddFriend($addFriendDto: AddFriendDto!) {
    addFriend(addFriendDto: $addFriendDto)
  }
`;
