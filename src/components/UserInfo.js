export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._profileId;
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

  setIdUser(id) {
    this._profileId = id;
  }

  getUserId() {
    return this._profileId;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
}