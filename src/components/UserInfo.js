export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    this._userInfoObject = {};
    this._userInfoObject.name = this._profileName.textContent;
    this._userInfoObject.info = this._profileInfo.textContent;
    return this._userInfoObject;
  }

  setUserInfo(name, info) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = info;
  }
}