export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._profileId;
  }

  getUserInfo() {
    this._userInfoObject = {};
    this._userInfoObject["user-name"] = this._profileName.textContent;
    this._userInfoObject["user-info"] = this._profileInfo.textContent;
    return this._userInfoObject;
  }

  setUserInfo({name, about, _id, avatar}) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
    this._profileId = _id;
    this._profileAvatar.src = avatar;
  }

  getUserId() {
    return this._profileId;
  }
}