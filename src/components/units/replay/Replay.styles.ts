import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh; /* Set the desired height of the container */
  position: relative;
`;

export const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // overflow: hidden;
`;
export const Singer = styled.div`
  color: #dff45b;
  font-size: 12px;
  font-weight: 700;
`;

export const SongTitle = styled.div`
  width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const ReplayInfo = styled.div`
  display: flex;
  alignitems: center;
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

  /* For Chrome, Safari, and Opera */
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

export const Profile = styled.img`
  width: 46px;
  border-radius: 50%;
`;

export const PlaceholderProfile = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #1a1128;
`;

export const Nickname = styled.div`
  margin-left: 12px;
  margin-top: 14px;
  font-size: 16px;
  color: white;
`;

export const ProfileWrapper = styled.div`
  display: flex;
`;
