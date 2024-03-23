import { toInt } from '@fdgn/common';
export class AuthConfig {
  accessTokenKey: string;
  accessTokenExpiresTime: number;
  refreshTokenKey: string;
  refreshTokenExpiresTime: number;

  constructor(props: AuthConfig) {
    this.accessTokenKey = props.accessTokenKey;
    this.refreshTokenKey = props.refreshTokenKey;
    this.accessTokenExpiresTime = toInt(props.accessTokenExpiresTime);
    this.refreshTokenExpiresTime = toInt(props.refreshTokenExpiresTime);
  }
}
