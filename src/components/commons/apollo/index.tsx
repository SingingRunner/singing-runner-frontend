import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  refreshAccessTokenLoadable,
} from "../../../commons/store";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

const GLOBAL_STATE = new InMemoryCache({
  typePolicies: {
    AuthUserDto: {
      keyFields: ["userId"],
    },
  },
});

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [hostUrl, setHostUrl] = useState("");
  const refreshLoadable = useRecoilValueLoadable(refreshAccessTokenLoadable);

  // 프리렌더링 무시
  useEffect(() => {
    void refreshLoadable.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
    setHostUrl(window.location.host);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러가 있다면,
    if (typeof graphQLErrors !== "undefined") {
      // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken으로 accessToken 재발급 및 저장
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              // 3. 방금 실패한 쿼리 정보 수정
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 3-1. 기존 헤더 값을 복사
                  Authorization: `Bearer ${newAccessToken ?? ""}`, // 3-2. 새로운 토큰으로 업데이트
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-3. 방금 수정한 쿼리 재요청
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    // uri: "http://localhost:3000/graphql", // 로컬 테스트용
    uri: `https://${hostUrl}/api/graphql`, // 배포용
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
    withCredentials: true,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
