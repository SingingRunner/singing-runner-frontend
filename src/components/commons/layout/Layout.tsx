import { ReactNode } from "react";
import * as S from "./Layout.styles";
import { useRouter } from "next/router";
import GlobalModal from "./globalModal/GlobalModal";
import { useGetUserInfo } from "../../../commons/hooks/useGetUserId";
import ServerSentEvents from "../serverSentEvents/ServerSentEvents";

interface ILayoutProps {
  children: ReactNode;
}

const NO_LAYOUT = ["/game", "/replay/ingame/[userId]/[replayId]"];

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  useGetUserInfo();

  return (
    <>
      {NO_LAYOUT.includes(router.pathname) ? (
        <>{props.children}</>
      ) : (
        <S.Background>
          <S.Body>
            <ServerSentEvents />
            <GlobalModal />
            <S.Wrapper>{props.children}</S.Wrapper>
          </S.Body>
        </S.Background>
      )}
    </>
  );
}
