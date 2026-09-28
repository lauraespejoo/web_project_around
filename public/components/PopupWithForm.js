import { Popup } from "./Popup.js";
// Popup hijo: gestiona el formulario dentro de un popup (editar perfil,
// agregar tarjeta, etc.) y delega el envío al controlador externo
// handleFormSubmit (acoplamiento débil).
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        var _a;
        super(popupSelector);
        this.handleSubmit = (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        };
        this.handleFormSubmit = handleFormSubmit;
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.submitButtonText = (_a = this.submitButton.textContent) !== null && _a !== void 0 ? _a : "";
    }
    // Recorre los inputs y devuelve un objeto { nombreDelCampo: valor }
    getInputValues() {
        const inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        const values = {};
        inputList.forEach((inputElement) => {
            values[inputElement.name] = inputElement.value;
        });
        return values;
    }
    // Cambia el texto del botón mientras se envían los datos al servidor
    renderLoading(isLoading, loadingText = "Guardando...") {
        this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
    }
    // Sobrescribe setEventListeners() para además escuchar el envío del formulario
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", this.handleSubmit);
    }
    // Sobrescribe close() para reiniciar el formulario al cerrar el popup
    close() {
        super.close();
        this.formElement.reset();
    }
}
