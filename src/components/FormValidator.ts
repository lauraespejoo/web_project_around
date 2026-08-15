import type { FormValidatorConfig } from "../types/types.js";

// Encapsula toda la lógica de validación de un formulario:
// revisa la validez de los campos y controla el estado del botón "Submit".
export class FormValidator {
  private config: FormValidatorConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: FormValidatorConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(this.config.inputSelector)
    );
    this.buttonElement = this.formElement.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  private showInputError(inputElement: HTMLInputElement, errorMessage: string): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this.config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.config.inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(this.config.errorClass);
      errorElement.textContent = "";
    }
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.buttonElement.classList.add(this.config.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.config.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    // Evita que el navegador envíe el formulario de forma nativa
    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
    });

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt: InputEvent) => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // Activa la validación del formulario
  enableValidation(): void {
    this.setEventListeners();
  }

  // Limpia los errores visuales y actualiza el estado del botón.
  // Se llama cada vez que se abre el modal que contiene este formulario.
  resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
    this.toggleButtonState();
  }
}
