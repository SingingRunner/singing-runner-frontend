export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type IAddFriendDto = {
  friendId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type IAuthDto = {
  __typename?: 'AuthDto';
  accessToken: Scalars['String']['output'];
  user: IUser;
};

export type IAuthTokenDto = {
  __typename?: 'AuthTokenDto';
  accessToken: Scalars['String']['output'];
};

export type IAuthUserDto = {
  __typename?: 'AuthUserDto';
  character: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  userActive: Scalars['Int']['output'];
  userEmail: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  userKeynote: Scalars['Int']['output'];
  userMmr: Scalars['Int']['output'];
  userPoint: Scalars['Int']['output'];
  userTier: Scalars['String']['output'];
};

export type IFriendDto = {
  __typename?: 'FriendDto';
  character: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  userActive: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
  userMmr: Scalars['Int']['output'];
  userTier: Scalars['String']['output'];
};

export type IGameSongDto = {
  __typename?: 'GameSongDto';
  singer: Scalars['String']['output'];
  songFemale: Scalars['String']['output'];
  songFemaleDown: Scalars['String']['output'];
  songFemaleUp: Scalars['String']['output'];
  songGender: Scalars['Boolean']['output'];
  songId: Scalars['Int']['output'];
  songLyrics: Scalars['String']['output'];
  songMale: Scalars['String']['output'];
  songMaleDown: Scalars['String']['output'];
  songMaleUp: Scalars['String']['output'];
  songTitle: Scalars['String']['output'];
  vocalMale: Scalars['String']['output'];
  vocalMaleDown: Scalars['String']['output'];
  vocalMaleUp: Scalars['String']['output'];
};

export type IGoogleAccount = {
  email: Scalars['String']['input'];
};

export type IGoogleUserResponseDto = {
  googleId: Scalars['String']['input'];
  google_account: IGoogleAccount;
};

export type IHostUserInput = {
  nickname: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type IKakaoAccount = {
  email: Scalars['String']['input'];
};

export type IKakaoUserResponseDto = {
  id: Scalars['String']['input'];
  kakao_account: IKakaoAccount;
};

export type IMutation = {
  __typename?: 'Mutation';
  addFriend: Scalars['String']['output'];
  deleteNotification: Scalars['String']['output'];
  friendRequest: Scalars['String']['output'];
  inviteFriend: Scalars['String']['output'];
  loginUser: IAuthDto;
  loginUserWithGoogle: IAuthDto;
  loginUserWithKakao: IAuthDto;
  logout: Scalars['String']['output'];
  refreshAccessToken: IAuthTokenDto;
  registerUser: IAuthDto;
  registerUserWithGoogle: IAuthDto;
  registerUserWithKakao: IAuthDto;
  removeFriend: Scalars['String']['output'];
  saveReplay: IReplay;
  updateCharacter: IUserCharacterResponseDto;
  updateReplayIsPublic: IReplayIsPublicResponseDto;
  updateUserKeynote: IUserKeynoteResponseDto;
};


export type IMutationAddFriendArgs = {
  addFriendDto: IAddFriendDto;
};


export type IMutationDeleteNotificationArgs = {
  notificationDto: INotificationDto;
};


export type IMutationFriendRequestArgs = {
  notificationDto: INotificationDto;
};


export type IMutationInviteFriendArgs = {
  friendId: Scalars['String']['input'];
  hostUserDto: IHostUserInput;
};


export type IMutationLoginUserArgs = {
  userAuthDto: IUserAuthDto;
};


export type IMutationLoginUserWithGoogleArgs = {
  googleUserResponse: IGoogleUserResponseDto;
};


export type IMutationLoginUserWithKakaoArgs = {
  kakaoUserResponse: IKakaoUserResponseDto;
};


export type IMutationLogoutArgs = {
  userId: Scalars['String']['input'];
};


export type IMutationRegisterUserArgs = {
  newUser: IUserRegisterDto;
};


export type IMutationRegisterUserWithGoogleArgs = {
  googleUserDto: IGoogleUserResponseDto;
  nickname: Scalars['String']['input'];
};


export type IMutationRegisterUserWithKakaoArgs = {
  kakaoUserResponse: IKakaoUserResponseDto;
  nickname: Scalars['String']['input'];
};


export type IMutationRemoveFriendArgs = {
  addFriendDto: IAddFriendDto;
};


export type IMutationSaveReplayArgs = {
  userId: Scalars['String']['input'];
  userVocal: Scalars['String']['input'];
};


export type IMutationUpdateCharacterArgs = {
  character: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type IMutationUpdateReplayIsPublicArgs = {
  isPublic: Scalars['Int']['input'];
  replayId: Scalars['Int']['input'];
};


export type IMutationUpdateUserKeynoteArgs = {
  keynote: IUserKeynoteStatus;
  userId: Scalars['String']['input'];
};

export type INotificationDto = {
  senderId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type IQuery = {
  __typename?: 'Query';
  fetchUser: IAuthUserDto;
  fetchUserByUserId: IAuthUserDto;
  getNotification: Array<IRequestDto>;
  getUserReplays: Array<IReplayWithSongInfo>;
  isEmailTaken: Scalars['Boolean']['output'];
  isNicknameTaken: Scalars['Boolean']['output'];
  playReplay: IReplayInfoDto;
  searchFriend: Array<ISearchFriendDto>;
  searchSong: Array<IGameSongDto>;
  searchUser: Array<IFriendDto>;
};


export type IQueryFetchUserByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type IQueryGetNotificationArgs = {
  page: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type IQueryGetUserReplaysArgs = {
  isMyReplay: Scalars['Boolean']['input'];
  pageNumber: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type IQueryIsEmailTakenArgs = {
  userEmail: Scalars['String']['input'];
};


export type IQueryIsNicknameTakenArgs = {
  nickname: Scalars['String']['input'];
};


export type IQueryPlayReplayArgs = {
  replayId: Scalars['Int']['input'];
};


export type IQuerySearchFriendArgs = {
  nickname: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type IQuerySearchSongArgs = {
  filter: Scalars['String']['input'];
  keyword: Scalars['String']['input'];
  page: Scalars['Int']['input'];
};


export type IQuerySearchUserArgs = {
  nickname: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type IReplay = {
  __typename?: 'Replay';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type IReplayInfoDto = {
  __typename?: 'ReplayInfoDto';
  characterList: Array<IReplayUserInfoDto>;
  gameEvent: Scalars['String']['output'];
  gameSong: IReplaySongDto;
  replayKeynote: Scalars['Int']['output'];
  userVocal: Scalars['String']['output'];
};

export type IReplayIsPublicResponseDto = {
  __typename?: 'ReplayIsPublicResponseDto';
  isPublic: Scalars['Int']['output'];
  replayId: Scalars['String']['output'];
};

export type IReplaySongDto = {
  __typename?: 'ReplaySongDto';
  singer: Scalars['String']['output'];
  songFemale: Scalars['String']['output'];
  songFemaleDown: Scalars['String']['output'];
  songFemaleUp: Scalars['String']['output'];
  songGender: Scalars['Boolean']['output'];
  songLyrics: Scalars['String']['output'];
  songMale: Scalars['String']['output'];
  songMaleDown: Scalars['String']['output'];
  songMaleUp: Scalars['String']['output'];
  songTitle: Scalars['String']['output'];
};

export type IReplayUserInfoDto = {
  __typename?: 'ReplayUserInfoDto';
  character: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type IReplayWithSongInfo = {
  __typename?: 'ReplayWithSongInfo';
  createdAt: Scalars['DateTime']['output'];
  isPublic: Scalars['Int']['output'];
  replayId: Scalars['Int']['output'];
  singer: Scalars['String']['output'];
  songTitle: Scalars['String']['output'];
};

export type IRequestDto = {
  __typename?: 'RequestDto';
  receivedAt: Scalars['DateTime']['output'];
  senderId: Scalars['String']['output'];
  senderNickname: Scalars['String']['output'];
};

export type ISearchFriendDto = {
  __typename?: 'SearchFriendDto';
  character: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  userActive: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
  userMmr: Scalars['Int']['output'];
  userTier: Scalars['String']['output'];
};

export type IUser = {
  __typename?: 'User';
  character: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  nickname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  userActive: Scalars['Int']['output'];
  userEmail: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  userKeynote: Scalars['Int']['output'];
  userMmr: Scalars['Int']['output'];
  userPoint: Scalars['Int']['output'];
};

export type IUserAuthDto = {
  password: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type IUserCharacterResponseDto = {
  __typename?: 'UserCharacterResponseDto';
  character: ICharacterEnum;
  userId: Scalars['String']['output'];
};

export type IUserKeynoteResponseDto = {
  __typename?: 'UserKeynoteResponseDto';
  userId: Scalars['String']['output'];
  userKeynote: Scalars['Int']['output'];
};

export type IUserRegisterDto = {
  nickname: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  userEmail: Scalars['String']['input'];
};

export enum ICharacterEnum {
  Beluga = 'BELUGA',
  Hare = 'HARE',
  Husky = 'HUSKY',
  Leopard = 'LEOPARD',
  Lynx = 'LYNX',
  Moose = 'MOOSE',
  Narwhal = 'NARWHAL',
  Puffin = 'PUFFIN',
  Puma = 'PUMA'
}

export enum IUserKeynoteStatus {
  FemaleKey = 'FEMALE_KEY',
  MaleKey = 'MALE_KEY',
  OriginalKey = 'ORIGINAL_KEY'
}
