export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
}

  _handleOverlayAndButtonClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      this.close();
    };
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupElement.addEventListener('mousedown', (evt) => {
      this._handleOverlayAndButtonClose(evt);
    });
  }
}