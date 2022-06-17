import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import { btnEdit, btnAdd, btnEditPhotoUser, formElementEdit, formElementAdd, formElementEditUserAvatar, nameInput, jobInput, validationData } from '../utils/constants.js';

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
    profileInfo.setUserInfo(userData);
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
  popupEdit.setInputValues(profileInfo.getUserInfo());
  profileFormValidator.resetInputErrors();
  popupEdit.open();
});

btnAdd.addEventListener('click', () => {
  cardAddFormValidator.resetInputErrors();
  popupAdd.open();
});

btnEditPhotoUser.addEventListener('click', () => {
  userEditAvatarFormValidator.resetInputErrors();
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
  })
  .finally(() => {
    setTimeout(() => {popupAdd.updateLoading("Сохранить")}, 300);
  });
}

function handleProfileEditFormSubmit(nameAndInfoObject) {
  popupEdit.updateLoading("Сохранение...");
  api.patchProfileEditing({name: nameAndInfoObject["user-name"], about: nameAndInfoObject["user-info"]})
  .then(nameAndInfoObject => {
    profileInfo.setUserInfo(nameAndInfoObject);
    popupEdit.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {popupEdit.updateLoading("Сохранить")}, 300);
  });
}

function handleDeleteSubmit(cardPlace) {
  api.deleteCard(cardPlace.getIdCard())
  .then(() => {
    cardPlace.removeCard();
    popupConfirmation.close();
  }) 
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
    profileInfo.setUserInfo(userAvatarObject);
    popupUser.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {popupUser.updateLoading("Сохранить")}, 300);
//    setTimeout(popupUser.updateLoading, 300, "Сохранить");
  })
}