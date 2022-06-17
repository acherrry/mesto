export const btnEdit = document.querySelector('.profile__edit-button');
export const btnAdd = document.querySelector('.profile__add-button');
export const btnEditPhotoUser = document.querySelector('.profile__avatar');
export const popupWindowEdit = document.querySelector('.popup_edit-profile');
export const popupWindowAdd = document.querySelector('.popup_add-new-item');
export const popupWindowEditUserAvatar = document.querySelector('.popup_update-avatar-form');
export const formElementEdit = popupWindowEdit.querySelector('.popup__form');
export const formElementAdd = popupWindowAdd.querySelector('.popup__form');
export const formElementEditUserAvatar = popupWindowEditUserAvatar.querySelector('.popup__form');
export const nameInput = popupWindowEdit.querySelector('#user-name');
export const jobInput = popupWindowEdit.querySelector('#user-info');

export const validationData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}