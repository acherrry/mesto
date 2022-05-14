export class FormValidator {
  constructor(validationData, formElement) {
    this._inputSelector = validationData.inputSelector;
    this._submitButtonSelector = validationData.submitButtonSelector;
    this._inactiveButtonClass = validationData.inactiveButtonClass;
    this._inputErrorClass = validationData.inputErrorClass;
    this._errorClass = validationData.errorClass;
    this._formElement = formElement
  }

  _toggleButton() {
    const submitButton = this._formElement.querySelector('.popup__save');
    submitButton.disabled = !this._formElement.checkValidity();
    submitButton.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
  }

  _showInputError(input) {
    const errorNode = this._formElement.querySelector(`#${input.id}-error`);
    errorNode.textContent = input.validationMessage;
    errorNode.classList.add('popup__error_visible');
    input.classList.add('popup__input_type_error');
  }

  _hideInputError(input) {
    const errorNode = this._formElement.querySelector(`#${input.id}-error`);
    errorNode.textContent = '';
    errorNode.classList.remove('popup__error_visible');
    input.classList.remove('popup__input_type_error');
  }

  _handleFormInput(input) {
    if(!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
    this._toggleButton();
  }

  resetInputErrors() {
    const inputs = this._formElement.querySelectorAll('.popup__input');
    inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButton();
  }

  _setEventListeners() {
    this._formElement.addEventListener('input', (evt) => {
      this._handleFormInput(evt.target);
    }); 
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButton();
  }
}