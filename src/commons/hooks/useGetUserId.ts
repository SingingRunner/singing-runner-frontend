import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userIdState } from "../store";
import { useEffect } from "react";
import { IQuery } from "../types/generated/types";
import { useRouter } from "next/router";

const FETCH_USER = gql`
  query FetchUser {
    fetchUser {
      userId
    }
  }
`;

export const useGetUserInfo = () => {
  const router = useRouter();
  const beforeLoginPath = ["/", "/login", "/signup"];
  if (beforeLoginPath.includes(router.asPath)) return;

  const [, setUserId] = useRecoilState(userIdState);
  const { data } = useQuery<Pick<IQuery, "fetchUser">>(FETCH_USER);

  useEffect(() => {
    setUserId(data?.fetchUser.userId || "");
  }, [data?.fetchUser.userId]);
};
