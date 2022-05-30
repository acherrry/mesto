import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupWindowReviewPlaceText = this._popupElement.querySelector('.popup__text');
    this._popupWindowReviewPlaceImage = this._popupElement.querySelector('.popup__img');
  }

  open(place) {
    super.open();
    this._popupWindowReviewPlaceImage.src = place.link;
    this._popupWindowReviewPlaceText.alt = place.name;
    this._popupWindowReviewPlaceText.textContent = place.name;
  }
}