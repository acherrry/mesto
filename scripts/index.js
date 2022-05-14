import { Card } from './Card.js';
import { initialCards } from './data.js';
import { FormValidator } from './FormValidator.js'

const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const popupWindows = document.querySelectorAll('.popup');
const formAdd = document.querySelector('.popup__form_add');
const popupWindowEdit = document.querySelector('.popup_edit-profile');
const popupWindowAdd = document.querySelector('.popup_add-new-item');
const popupWindowReviewPlace = document.querySelector('.popup_review-place');
const popupImg = popupWindowReviewPlace.querySelector('.popup__img');
const btnCloseWindowEdit = popupWindowEdit.querySelector('.popup__close');
const btnCloseWindowAdd = popupWindowAdd.querySelector('.popup__close');
const btnCloseWindowReviewPlace = popupWindowReviewPlace.querySelector('.popup__close');
const formElementEdit = popupWindowEdit.querySelector('.popup__form');
const formElementAdd = popupWindowAdd.querySelector('.popup__form');
const nameInput = popupWindowEdit.querySelector('#user-name');
const jobInput = popupWindowEdit.querySelector('#user-info');
const namePlaceInput = popupWindowAdd.querySelector('#place-name');
const linkInput = popupWindowAdd.querySelector('#place-link');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const placesList = document.querySelector('.places__list');

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

function getCard (cardData) {
  const cardPlace = new Card(cardData, '.place-template', displayPlaceImg);
  return cardPlace.generateCard();
}

initialCards.forEach((cardElement) => {
  placesList.append(getCard(cardElement));
});

function setProfileInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function openFormEdit() {
  setProfileInput();
  profileFormValidator.resetInputErrors();
  openPopup(popupWindowEdit);
}

function openFormAdd() {
  formAdd.reset();
  cardAddFormValidator.resetInputErrors();
  openPopup(popupWindowAdd);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', onEscClose);
}

btnEdit.addEventListener('click', openFormEdit);

btnAdd.addEventListener('click', openFormAdd);

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', onEscClose);
}
btnCloseWindowEdit.addEventListener('click', function () {
  closePopup(popupWindowEdit);
});
btnCloseWindowAdd.addEventListener('click', function () {
  closePopup(popupWindowAdd);
});
btnCloseWindowReviewPlace.addEventListener('click', function () {
  closePopup(popupWindowReviewPlace);
});

function onOverlayClose (evt, popupWindow) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupWindow);
  }
}

function onEscClose (evt) {
  const escCode = 'Escape';
  if (evt.key === escCode) {
    const openPopupWin = document.querySelector('.popup_opened');
    closePopup(openPopupWin);
    }
}

popupWindows.forEach(function (popupWindow) {
  popupWindow.addEventListener('mousedown', function (evt) {
    onOverlayClose (evt, popupWindow);
  });
});

function displayPlaceImg(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupWindowReviewPlace.querySelector('.popup__text').textContent = name;
  openPopup(popupWindowReviewPlace);
}

function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  const placeHandlerObject = {
    name:namePlaceInput.value, 
    link:linkInput.value
  }

  placesList.prepend(getCard(placeHandlerObject));
  closePopup(popupWindowAdd);
}

function handleProfileEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupWindowEdit);
}

formElementEdit.addEventListener('submit', handleProfileEditFormSubmit);
formElementAdd.addEventListener('submit', handleAddCardFormSubmit);