export default class Card {
  constructor(place, cardSelector, handleCardClick, handleCardDeleteSubmit, handleLikeCard, handleDeleteLikeCard) {
    this._name = place.name;
    this._link = place.link;
    this._likes = place.likes;
    this._id = place.owner._id;
    this._idCard = place._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteSubmit = handleCardDeleteSubmit;
    this._handleLikeCard = handleLikeCard;
    this._element = this._getTemplate();
    this._placeImg = this._element.querySelector('.place__img');
    this._placeName = this._element.querySelector('.place__name');
    this._btnDelete = this._element.querySelector('.place__delete-button');
    this._numberOfLikes = this._element.querySelector('.place__number-of-likes');
    this._btnLike = this._element.querySelector('.place__like-button');
    this._handleDeleteLikeCard = handleDeleteLikeCard;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);
    return cardElement;
  }

  generateCard(myId) {
    this._setEventListeners();
    if (this._id !== myId) {
      this._btnDelete.classList.add('place__delete-button_hide');
    }
    this._placeImg.alt = this._name;
    this._placeImg.src = this._link;
    this._placeName.textContent = this._name;
    this.updateLikes(myId);
    return this._element;
  }

  updateLikes(myId) {
    this._numberOfLikes.textContent = this._likes.length;
    if (this._likes.find(userObject => userObject._id == myId) !== undefined) {
      this._btnLike.classList.add('place__like-button_active');
    } else {
      this._btnLike.classList.remove('place__like-button_active');
    }
  }
  
  setLikesLength(userId, userlikes) {
    this._likes = userlikes;
    this.updateLikes(userId);
  }

  getIdCard() {
    return this._idCard;
  }

  _setEventListeners() {
    this._btnDelete.addEventListener('click', () => {
      this._handleCardDeleteSubmit(this);
    });

    
    this._btnLike.addEventListener('click', () => {
      if (this._btnLike.classList.contains('place__like-button_active')) {
        this._handleDeleteLikeCard(this);
      } else {
        this._handleLikeCard(this);
      }
    });

    this._placeImg.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}