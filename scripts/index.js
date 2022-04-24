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

const initialCards = [
  {
    name: 'Крым',
    link: 'https://sun9-25.userapi.com/impf/TIqHi048XAXRwEdJfFEenR8qXzriVDT2HQnq9A/G4pEeTBryio.jpg?size=1080x810&quality=96&sign=aced6117e0633c2fbb01156765dfda78&type=album'
  },
  {
    name: 'Карелия',
    link: 'https://sun9-46.userapi.com/impf/c858320/v858320448/2322bf/mPDNGthe4Eg.jpg?size=1333x1000&quality=96&sign=d6013a829babc332fdcf1103168f7d52&type=album'
  },
  {
    name: 'Териберка',
    link: 'https://sun9-15.userapi.com/impf/c857636/v857636332/234274/cT028hH5cvk.jpg?size=1333x1000&quality=96&sign=b8777b2ae975acb0a7ba90ff3c2b8047&type=album'
  },
  {
    name: 'Дагестан',
    link: 'https://sun9-78.userapi.com/impf/f5xhX78FIaay7IGMEljB9f5xyGSjxAVCm7ynAw/sqkw6EHCtqg.jpg?size=1600x1200&quality=96&sign=6d637a098bbb099e2f3b91ffe18e88c1&type=album'
  },
  {
    name: 'Пятигорск',
    link: 'https://sun9-70.userapi.com/impf/c846419/v846419406/52465/iOiakS2gYnw.jpg?size=2560x1696&quality=96&sign=a8cca11d6d3e34b60da8e4720e265ea7&type=album'
  },
  {
    name: 'Карачаево-Черкесия',
    link: 'https://sun9-31.userapi.com/impf/c845322/v845322715/8df1a/34pZo3qly64.jpg?size=2560x1696&quality=96&sign=57edd6f5003e0d8abd7354754a93746e&type=album'
  }
];

function setProfileInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', onEscClose);
}
btnEdit.addEventListener('click', function () {
  setProfileInput();
  resetInputErrors(formEdit, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openPopup(popupWindowEdit);
});
btnAdd.addEventListener('click', function () {
  namePlaceInput.value = '';
  linkInput.value = '';
  resetInputErrors(formAdd, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openPopup(popupWindowAdd);
});

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
  const openPopupWin = document.querySelector('.popup_opened');
  if (evt.key === escCode) {
    closePopup(openPopupWin);
    }
}

popupWindows.forEach(function (popupWindow) {
  popupWindow.addEventListener('mousedown', function (evt) {
    onOverlayClose (evt, popupWindow);
  });
});

function activatebtnLike(evt) {
  evt.target.classList.toggle('place__like-button_active');
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

  btnLike.addEventListener('click', activatebtnLike);
  btnDelete.addEventListener('click', function (evt) {
    evt.target.closest('.place');
    placeElement.remove();
  });
  placeImg.addEventListener('click', () => {
    displayPlaceImg(name, link);
  });

  return placeElement;
}

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  placesList.prepend(getPlaceElement(namePlaceInput.value, linkInput.value));
  closePopup(popupWindowAdd);
}

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupWindowEdit);
}

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

initialCards.forEach(function (element) {
  placesList.append(getPlaceElement(element.name, element.link));
});