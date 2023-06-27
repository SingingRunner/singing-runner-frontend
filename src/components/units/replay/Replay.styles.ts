import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props: { isMyReplay: boolean }) =>
    props.isMyReplay ? `100%` : `calc(100% - 16px)`};
  position: relative;
`;

export const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 140px);
`;

export const SingerDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Singer = styled.div`
  color: #dff45b;
  font-size: 12px;
  font-weight: 700;
`;

export const Date = styled.div`
  color: #fff;
  font-size: 10px;
  font-weight: 300;
`;

export const SongTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ReplayInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
`;

export const InfiniteScrollWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
  img {
    height: 40px;
    width: 40px;
    margin: 0 -4px;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Profile = styled.img`
  width: 30px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const PlaceholderProfile = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 12px;
`;

export const Nickname = styled.div`
  font-size: 16px;
  color: white;
  font-weight: 700;
`;
