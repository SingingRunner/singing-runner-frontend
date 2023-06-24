import { gql, GraphQLClient } from "graphql-request";
import { IMutation } from "../types/generated/types";

const REFRESH_ACCESS_TOKEN = gql`
  mutation {
    refreshAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQLClient = new GraphQLClient( "http://localhost:3000/graphql", // 로컬 테스트용
    // const graphQLClient = new GraphQLClient(
    //   "https://injungle.shop/api/graphql", // 서버 테스트용
      { credentials: "include" }
    );
    const result = await graphQLClient.request<
      Pick<IMutation, "refreshAccessToken">
    >(REFRESH_ACCESS_TOKEN);
    const newAccessToken = result.refreshAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
