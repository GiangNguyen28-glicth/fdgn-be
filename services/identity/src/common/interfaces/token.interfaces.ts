export interface IToken {
  accessToken: string;
  refreshToken?: string;
}

export interface IAccessTokenPayload {
  _id: string;
  role?: string;
}

export interface IRefreshPayload {
  _id: string;
  refreshToken: string;
}
