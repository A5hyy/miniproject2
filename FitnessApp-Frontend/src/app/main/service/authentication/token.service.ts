import {Injectable} from '@angular/core';
import {SETTINGS} from "../../settings/commons.settings";
import {JwtHelperService} from "@auth0/angular-jwt";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessToken;

  private refreshToken;

  private jwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelperService();
    this.accessToken = null;
    this.refreshToken = null;
    let accessTokenEnc = localStorage.getItem(SETTINGS.ACCESS_TOKEN);
    let refreshTokenEnc = localStorage.getItem(SETTINGS.ACCESS_TOKEN);

    if (accessTokenEnc) {
      this.accessToken = CryptoJS.AES.decrypt(accessTokenEnc, SETTINGS.KEYS.SECRET).toString(CryptoJS.enc.Utf8);
    }

    if (refreshTokenEnc) {
      this.refreshToken = CryptoJS.AES.decrypt(refreshTokenEnc, SETTINGS.KEYS.SECRET).toString(CryptoJS.enc.Utf8);
    }
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(SETTINGS.ACCESS_TOKEN, CryptoJS.AES.encrypt(accessToken, SETTINGS.KEYS.SECRET).toString());
    this.accessToken = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(SETTINGS.REFRESH_TOKEN, CryptoJS.AES.encrypt(refreshToken, SETTINGS.KEYS.SECRET).toString());
    this.refreshToken = refreshToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  isAccessTokenExpired() {
    if (this.accessToken) {
      return this.jwtHelper.isTokenExpired(this.accessToken);
    }
    return true;
  }

  isRefreshTokenExpired() {
    if (this.refreshToken) {
      return this.jwtHelper.isTokenExpired(this.refreshToken);
    }
    return true;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }
}
