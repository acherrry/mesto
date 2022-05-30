import '../pages/index.css';

import Card from '../components/Card.js';
import { initialCards } from '../utils/data.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const popupWindowEdit = document.querySelector('.popup_edit-profile');
const popupWindowAdd = document.querySelector('.popup_add-new-item');
const formElementEdit = popupWindowEdit.querySelector('.popup__form');
const formElementAdd = popupWindowAdd.querySelector('.popup__form');
const nameInput = popupWindowEdit.querySelector('#user-name');
const jobInput = popupWindowEdit.querySelector('#user-info');

function getCard (cardData) {
  const cardPlace = new Card(cardData, '.place-template', () => {popupImage.open(cardData)});
  return cardPlace.generateCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (initialCard) => {
    const cardElement = getCard (initialCard);
    cardsList.addItem(cardElement);
  }
},'.places__list');

cardsList.renderItems();

const popupEdit = new PopupWithForm('.popup_edit-profile', handleProfileEditFormSubmit);
const popupAdd = new PopupWithForm('.popup_add-new-item', handleAddCardFormSubmit);
const popupImage = new PopupWithImage('.popup_review-place');
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

const validationData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardAddFormValidator = new FormValidator(validationData, formElementAdd);
const profileFormValidator = new FormValidator(validationData,  formElementEdit);
cardAddFormValidator.enableValidation();
profileFormValidator.enableValidation();

const profileInfo = new UserInfo({profileNameSelector: '.profile__name', profileInfoSelector:'.profile__status'});

btnEdit.addEventListener('click', () => {
  const nameAndInfoUserObject = profileInfo.getUserInfo();
  nameInput.value = nameAndInfoUserObject.name;
  jobInput.value = nameAndInfoUserObject.info;
  profileFormValidator.resetInputErrors();
  popupEdit.open();
});

btnAdd.addEventListener('click', () => {
  cardAddFormValidator.resetInputErrors();
  popupAdd.open();
});

function handleAddCardFormSubmit(nameAndLinkObject) {
cardsList.addItem(getCard({name: nameAndLinkObject["place-name"], link: nameAndLinkObject["place-link"]}))
}

function handleProfileEditFormSubmit(nameAndInfoObject) {
  profileInfo.setUserInfo(nameAndInfoObject["user-name"], nameAndInfoObject["user-info"]);
}