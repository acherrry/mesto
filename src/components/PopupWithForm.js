import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputsList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._formFieldsData = {};
    this._inputsList.forEach((input) => {
      this._formFieldsData[input.name] = input.value;
    });
  return this._formFieldsData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit',(evt) => {
      this._handleFormSubmit(this._formFieldsData);
      evt.preventDefault();
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}