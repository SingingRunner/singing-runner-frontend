import { ReactNode } from "react";
import * as S from "./Layout.styles";
import Header from "./header/Header";
import { useRouter } from "next/router";

interface ILayoutProps {
  children: ReactNode;
}

const NO_LAYOUT = ["/game"];
export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  return (
    <>
      {NO_LAYOUT.includes(router.asPath) ? (
        <>{props.children}</>
      ) : (
        <S.Background>
          <Header />
          <S.Body>
            <S.Wrapper>{props.children}</S.Wrapper>
          </S.Body>
        </S.Background>
      )}
    </>
  );
}
