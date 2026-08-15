// Encapsula toda la lógica de validación de un formulario:
// revisa la validez de los campos y controla el estado del botón "Submit".
export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add(this.config.errorClass);
        }
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.classList.remove(this.config.errorClass);
            errorElement.textContent = "";
        }
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.buttonElement.classList.add(this.config.inactiveButtonClass);
            this.buttonElement.disabled = true;
        }
        else {
            this.buttonElement.classList.remove(this.config.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        // Evita que el navegador envíe el formulario de forma nativa
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (evt) => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    // Activa la validación del formulario
    enableValidation() {
        this.setEventListeners();
    }
    // Limpia los errores visuales y actualiza el estado del botón.
    // Se llama cada vez que se abre el modal que contiene este formulario.
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
