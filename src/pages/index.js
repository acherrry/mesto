import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';

const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const btnEditPhotoUser = document.querySelector('.profile__avatar');
const popupWindowEdit = document.querySelector('.popup_edit-profile');
const popupWindowAdd = document.querySelector('.popup_add-new-item');
const popupWindowEditUserAvatar = document.querySelector('.popup_update-avatar-form');
const formElementEdit = popupWindowEdit.querySelector('.popup__form');
const formElementAdd = popupWindowAdd.querySelector('.popup__form');
const formElementEditUserAvatar = popupWindowEditUserAvatar.querySelector('.popup__form');
const nameInput = popupWindowEdit.querySelector('#user-name');
const jobInput = popupWindowEdit.querySelector('#user-info');

const popupEdit = new PopupWithForm('.popup_edit-profile', handleProfileEditFormSubmit);
const popupAdd = new PopupWithForm('.popup_add-new-item', handleAddCardFormSubmit);
const popupUser = new PopupWithForm('.popup_update-avatar-form', handleAddAvatarUserSubmit);
const popupImage = new PopupWithImage('.popup_review-place');
const popupConfirmation = new PopupWithConfirmation('.popup_deletion-confirmation');

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupUser.setEventListeners();
popupImage.setEventListeners();
popupConfirmation.setEventListeners();

const validationData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardAddFormValidator = new FormValidator(validationData, formElementAdd);
const profileFormValidator = new FormValidator(validationData,  formElementEdit);
const userEditAvatarFormValidator = new FormValidator(validationData,  formElementEditUserAvatar);
cardAddFormValidator.enableValidation();
profileFormValidator.enableValidation();
userEditAvatarFormValidator.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43');

const profileInfo = new UserInfo({profileNameSelector: '.profile__name', profileInfoSelector:'.profile__status', profileAvatarSelector: '.profile__img'});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    profileInfo.setUserAvatar(userData.avatar);
    profileInfo.setUserInfo(userData.name, userData.about);
    profileInfo.setIdUser(userData._id);
    cardsList.renderItems(cards.reverse());
  })
    .catch(err => {
    console.log(err);
  });

function getCard(cardData) {
  const cardPlace = new Card(cardData, '.place-template', () => {popupImage.open(cardData)}, confirmDeletion, handleAddingLike, handleDeleteLike);
  return cardPlace.generateCard(profileInfo.getUserId());
}

function confirmDeletion(card) {
  popupConfirmation.open();
  popupConfirmation.setSubmitAction(() => handleDeleteSubmit(card));
}

const cardsList = new Section(
  (item) => {
    cardsList.addItem(getCard(item));
  }
    ,'.places__list');

btnEdit.addEventListener('click', () => {
  const nameAndInfoUserObject = profileInfo.getUserInfo();
  nameInput.value = nameAndInfoUserObject.name;
  jobInput.value = nameAndInfoUserObject.info;
  profileFormValidator.resetInputErrors();
  popupEdit.updateLoading("Сохранить");
  popupEdit.open();
});

btnAdd.addEventListener('click', () => {
  cardAddFormValidator.resetInputErrors();
  popupAdd.updateLoading("Сохранить");
  popupAdd.open();
});

btnEditPhotoUser.addEventListener('click', () => {
  userEditAvatarFormValidator.resetInputErrors();
  popupUser.updateLoading("Сохранить");
  popupUser.open();
});


function handleAddCardFormSubmit(nameAndLinkObject) {
  popupAdd.updateLoading("Сохранение...");
  api.postAddingNewCard({name: nameAndLinkObject["place-name"], link: nameAndLinkObject["place-link"]})
  .then(cardInfoObject => {
    cardsList.addItem(getCard(cardInfoObject));
    popupAdd.close();
  })
  .catch(err => {
    console.log(err);
  });
}

function handleProfileEditFormSubmit(nameAndInfoObject) {
  popupEdit.updateLoading("Сохранение...");
  api.patchProfileEditing({name: nameAndInfoObject["user-name"], about: nameAndInfoObject["user-info"]})
  .then(nameAndInfoObject => {
    profileInfo.setUserInfo(nameAndInfoObject.name, nameAndInfoObject.about);
    popupEdit.close();
  })
  .catch(err => {
    console.log(err);
  });
}

function handleDeleteSubmit(cardPlace) {
  api.deleteCard(cardPlace.getIdCard())
  .then(cardPlace.removeCard()) 
  .catch(err => {
    console.log(err);
  });
}

function handleAddingLike(cardPlace) {
  api.putSettingLike(cardPlace.getIdCard())
  .then(cardInfoObject => {
    cardPlace.setLikesLength(profileInfo.getUserId(), cardInfoObject.likes);
  })
  .catch(err => {
    console.log(err);
  });
}

function handleDeleteLike(cardPlace) {
  api.removeLike(cardPlace.getIdCard())
    .then(cardInfoObject => {
      cardPlace.setLikesLength(profileInfo.getUserId(), cardInfoObject.likes);
    })
    .catch(err => {
      console.log(err);
    });
}

function handleAddAvatarUserSubmit(userAvatarObject) {
  popupUser.updateLoading("Сохранение...");
  api.patchEditingUserAvatar({avatar: userAvatarObject["user-photo-link"]})
  .then(userAvatarObject => {
    profileInfo.setUserAvatar(userAvatarObject.avatar);
    popupUser.close();
  })
  .catch(err => {
    console.log(err);
  });
}
