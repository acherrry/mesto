const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const popupWindows = document.querySelectorAll('.popup');
const formEdit = document.querySelector('.popup__form_edit');
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
const placeTemplate = document.querySelector('#place-template').content;
const nameInput = popupWindowEdit.querySelector('#user-name');
const jobInput = popupWindowEdit.querySelector('#user-info');
const namePlaceInput = popupWindowAdd.querySelector('#place-name');
const linkInput = popupWindowAdd.querySelector('#place-link');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const placesList = document.querySelector('.places__list');

function setProfileInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function openFormEdit() {
  setProfileInput();
  resetInputErrors(formEdit, validationData);
  openPopup(popupWindowEdit);
}

function openFormAdd() {
  formAdd.reset();
  resetInputErrors(formAdd, validationData);
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

function activateBtnLike(evt) {
  evt.target.classList.toggle('place__like-button_active');
}

function removeCard(evt) {
  const card = evt.target.closest('.place');
  card.remove();
}

function displayPlaceImg(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupWindowReviewPlace.querySelector('.popup__text').textContent = name;
  openPopup(popupWindowReviewPlace);
}

function getPlaceElement(name, link) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__name').textContent = name;
  const placeImg = placeElement.querySelector('.place__img');
  placeImg.src = link;
  placeImg.alt = name;
  const btnLike = placeElement.querySelector('.place__like-button');
  const btnDelete = placeElement.querySelector('.place__delete-button');

  btnLike.addEventListener('click', activateBtnLike);
  btnDelete.addEventListener('click', removeCard);
  placeImg.addEventListener('click', () => {
    displayPlaceImg(name, link);
  });

  return placeElement;
}

function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  placesList.prepend(getPlaceElement(namePlaceInput.value, linkInput.value));
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

initialCards.forEach(function (element) {
  placesList.append(getPlaceElement(element.name, element.link));
});