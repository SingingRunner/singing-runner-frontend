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

export type IAuth = {
  __typename?: 'Auth';
  accessToken: Scalars['String']['output'];
  user: IUser;
};

export type IAuthUser = {
  __typename?: 'AuthUser';
  character: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  userActive: Scalars['Int']['output'];
  userEmail: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  userKeynote: Scalars['Int']['output'];
  userMmr: Scalars['Int']['output'];
  userPoint: Scalars['Int']['output'];
};

export type IGameSongDto = {
  __typename?: 'GameSongDto';
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
  vocalMale: Scalars['String']['output'];
  vocalMaleDown: Scalars['String']['output'];
  vocalMaleUp: Scalars['String']['output'];
};

export type IMutation = {
  __typename?: 'Mutation';
  loginUser: IAuth;
  refreshAccessToken: IToken;
  registerUser: IUser;
};


export type IMutationLoginUserArgs = {
  userLoginDto: IUserLoginDto;
};


export type IMutationRegisterUserArgs = {
  newUser: IUserRegisterDto;
};

export type IQuery = {
  __typename?: 'Query';
  fetchUser: IAuthUser;
  searchSong: Array<IGameSongDto>;
};


export type IQuerySearchSongArgs = {
  keyword: Scalars['String']['input'];
  page: Scalars['Int']['input'];
};

export type IToken = {
  __typename?: 'Token';
  accessToken: Scalars['String']['output'];
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

export type IUserLoginDto = {
  password: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type IUserRegisterDto = {
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};
