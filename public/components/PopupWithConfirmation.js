import { Popup } from "./Popup.js";
// Popup hijo: pide confirmación antes de realizar una acción (eliminar una tarjeta).
// La acción a ejecutar se define cada vez que se abre, con setSubmitAction(),
// porque depende de qué tarjeta se quiere borrar.
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.handleConfirm = null;
        this.handleSubmit = (evt) => {
            var _a;
            evt.preventDefault();
            (_a = this.handleConfirm) === null || _a === void 0 ? void 0 : _a.call(this);
        };
        this.formElement = this.popupElement.querySelector(".popup__form");
    }
    // Guarda la función que se ejecutará al hacer clic en "Sí"
    setSubmitAction(action) {
        this.handleConfirm = action;
    }
    // Sobrescribe setEventListeners() para además escuchar el botón "Sí"
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", this.handleSubmit);
    }
}
