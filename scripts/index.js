let editBtn = document.querySelector('.profile__edit-button');
let popupWindow = document.querySelector('.popup');
let closeBtn = popupWindow.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#user-name');
let jobInput = document.querySelector('#user-info');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

editBtn.addEventListener('click', togglePopup);
closeBtn.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

function togglePopup() {
  popupWindow.classList.toggle('popup_is-active');
  
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  togglePopup();
}

