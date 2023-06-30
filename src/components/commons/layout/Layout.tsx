import { ReactNode } from "react";
import * as S from "./Layout.styles";
import { useRouter } from "next/router";
import LongPolling from "../longPolling/LongPolling";

interface ILayoutProps {
  children: ReactNode;
}

const NO_LAYOUT = ["/game", "/replay/ingame/[userId]/[replayId]"];

export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  return (
    <>
      {NO_LAYOUT.includes(router.pathname) ? (
        <>{props.children}</>
      ) : (
        <S.Background>
          <S.Body>
            <LongPolling />
            <S.Wrapper>{props.children}</S.Wrapper>
          </S.Body>
        </S.Background>
      )}
    </>
  );
}
