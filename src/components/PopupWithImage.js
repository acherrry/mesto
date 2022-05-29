import Popup from './Popup';

export default class PopupWithImage extends Popup {
  open(place) {
    super.open();
    this._popupElement.querySelector('.popup__img').src = place.link;
    this._popupWindowReviewPlaceText = this._popupElement.querySelector('.popup__text');
    this._popupWindowReviewPlaceText.alt = place.name;
    this._popupWindowReviewPlaceText.textContent = place.name;
  }
}