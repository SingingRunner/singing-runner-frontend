import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userIdState } from "../store";
import { useEffect } from "react";
import { IQuery } from "../types/generated/types";

const FETCH_USER = gql`
  query FetchUser {
    fetchUser {
      userId
    }
  }
`;

export const useGetUserInfo = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useQuery<Pick<IQuery, "fetchUser">>(FETCH_USER);

  useEffect(() => {
    if (!userId) {
      setUserId(data?.fetchUser.userId || "");
      console.log("🚨 userId 갱신", data?.fetchUser.userId);
    }
  }, [userId, data?.fetchUser.userId]);
};
