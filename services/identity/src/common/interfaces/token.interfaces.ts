export interface IToken {
  accessToken: string;
  refreshToken?: string;
}

export interface IAccessTokenPayload {
  id: number;
  role?: string;
}

export interface IRefreshPayload {
  id: number;
  refreshToken: string;
}
