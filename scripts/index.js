const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup');
const popupWindowEdit = document.querySelector('.popup_edit-profile');
const popupWindowAdd = document.querySelector('.popup_add-new-item');
const popupWindowReviewPlace = document.querySelector('.popup_review-place');
const closeBtnWindowEdit = popupWindowEdit.querySelector('.popup__close');
const closeBtnWindowAdd = popupWindowAdd.querySelector('.popup__close');
const closeBtnWindowReviewPlace = popupWindowReviewPlace.querySelector('.popup__close');
const formElementEdit = popupWindowEdit.querySelector('.popup__form');
const formElementAdd = popupWindowAdd.querySelector('.popup__form');
const placeTemplate = document.querySelector('#place-template').content;
let nameInput = popupWindowEdit.querySelector('#user-name');
let jobInput = popupWindowEdit.querySelector('#user-info');
let namePlaceInput = popupWindowAdd.querySelector('#place-name');
let linkInput = popupWindowAdd.querySelector('#place-link');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let placesList = document.querySelector('.places__list');

let initialCards = [
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

nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-active');
}
editBtn.addEventListener('click', function () {
  openPopup(popupWindowEdit);
});
addBtn.addEventListener('click', function () {
  openPopup(popupWindowAdd);
});

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-active');
}
closeBtnWindowEdit.addEventListener('click', function () {
  closePopup(popupWindowEdit);
});
closeBtnWindowAdd.addEventListener('click', function () {
  closePopup(popupWindowAdd);
});
closeBtnWindowReviewPlace.addEventListener('click', function () {
  closePopup(popupWindowReviewPlace);
});

function getPlaceElement(name, link) {
  let placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__name').textContent = name;
  placeElement.querySelector('.place__img').src = link;

  const likeBtn = placeElement.querySelector('.place__like-button');
  likeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');
  });

  const deleteBtn = placeElement.querySelector('.place__delete-button');
  deleteBtn.addEventListener('click', function () {
    const placeElement = deleteBtn.closest('.place');
    placeElement.remove();
  });

  let reviewPlace = placeElement.querySelector('.place__img');
  reviewPlace.addEventListener('click', function () {
    popupWindowReviewPlace.querySelector('.popup__img').src = link;
    popupWindowReviewPlace.querySelector('.popup__img').alt = name;
    popupWindowReviewPlace.querySelector('.popup__text').textContent = name;
    openPopup(popupWindowReviewPlace);
  });
  return placeElement;
}

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  placesList.prepend(getPlaceElement(namePlaceInput.value, linkInput.value));
  namePlaceInput.value = namePlaceInput.textContent;
  linkInput.value = linkInput.textContent;
  closePopup(popupWindowAdd);
}
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupWindowEdit);
}
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

initialCards.forEach(function (element) {
  placesList.append(getPlaceElement(element.name, element.link));
});