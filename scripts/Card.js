export class Card {
  constructor(place, cardSelector, handleClickToPhoto) {
    this._name = place.name;
    this._link = place.link;
    this._cardSelector = cardSelector;
    this._handleClickToPhoto = handleClickToPhoto
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

  return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._placeImg = this._element.querySelector('.place__img');
    
    this._setEventListeners();

    this._placeImg.alt = this._name;
    this._placeImg.src = this._link;
    this._element.querySelector('.place__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    const btnDelete = this._element.querySelector('.place__delete-button');
    btnDelete.addEventListener('click', () => {
      this._removeCard();
    });

    const btnLike = this._element.querySelector('.place__like-button');
    btnLike.addEventListener('click', () => {
      this._activateBtnLike(btnLike);
    });

    this._placeImg.addEventListener('click', () => {
      this._handleClickToPhoto(this._name, this._link);
    });
  }

  _removeCard() {
    this._element.remove();
  }

  _activateBtnLike(evt) {
    evt.classList.toggle('place__like-button_active');
  }
}