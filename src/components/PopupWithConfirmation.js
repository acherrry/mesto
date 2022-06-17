import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {

  setEventListeners() {
    super.setEventListeners();
    this._popupConfirmationButtonDelete = this._popupElement.querySelector('.popup__save_deletion-confirmation');
    this._popupConfirmationButtonDelete.addEventListener('click', () => {
      this._handleSubmitCallback(this._removingCard);
    });
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
}