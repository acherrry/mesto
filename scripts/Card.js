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
    this._btnDelete = this._element.querySelector('.place__delete-button');
    this._btnDelete.addEventListener('click', () => {
      this._removeCard();
    });

    this._btnLike = this._element.querySelector('.place__like-button');
    this._btnLike.addEventListener('click', () => {
      this._activateBtnLike(this._btnLike);
    });

    this._placeImg.addEventListener('click', () => {
      this._handleClickToPhoto(this._name, this._link);
    });
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _activateBtnLike() {
    this._btnLike.classList.toggle('place__like-button_active');
  }
}