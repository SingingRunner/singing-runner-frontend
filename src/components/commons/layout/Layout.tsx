import { ReactNode } from "react";
import * as S from "./Layout.styles";
import { useRouter } from "next/router";
import LongPolling from "../longPolling/LongPolling";

interface ILayoutProps {
  children: ReactNode;
}

const NO_LAYOUT = ["/game", "/replay/ingame/[userId]/[replayId]"];
const NO_LONG_POLLING = ["/game", "/custom", "/signup", "/login", "/"];

export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  return (
    <>
      {NO_LAYOUT.includes(router.pathname) ? (
        <>{props.children}</>
      ) : (
        <S.Background>
          <S.Body>
            {NO_LONG_POLLING.includes(router.asPath) || <LongPolling />}
            <S.Wrapper>{props.children}</S.Wrapper>
          </S.Body>
        </S.Background>
      )}
    </>
  );
}
