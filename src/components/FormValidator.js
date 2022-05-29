export default class FormValidator {
  constructor(validationData, formElement) {
    this._inputSelector = validationData.inputSelector;
    this._submitButtonSelector = validationData.submitButtonSelector;
    this._inactiveButtonClass = validationData.inactiveButtonClass;
    this._inputErrorClass = validationData.inputErrorClass;
    this._errorClass = validationData.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputs = this._formElement.querySelectorAll(this._inputSelector)
  }

  _toggleButton() {
    this._submitButton.disabled = !this._formElement.checkValidity();
    this._submitButton.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
  }

  _showInputError(input) {
    const errorNode = this._formElement.querySelector(`#${input.id}-error`);
    errorNode.textContent = input.validationMessage;
    errorNode.classList.add(this.errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorNode = this._formElement.querySelector(`#${input.id}-error`);
    errorNode.textContent = '';
    errorNode.classList.remove(this.errorClass);
    input.classList.remove(this._inputErrorClass);
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
    this._inputs.forEach((input) => {
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