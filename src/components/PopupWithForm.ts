import { Popup } from "./Popup.js";
import type { FormValues, HandleFormSubmit } from "../types/types.js";

// Popup hijo: gestiona el formulario dentro de un popup (editar perfil,
// agregar tarjeta, etc.) y delega el envío al controlador externo
// handleFormSubmit (acoplamiento débil).
export class PopupWithForm extends Popup {
  private handleFormSubmit: HandleFormSubmit;
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private submitButtonText: string;

  constructor(popupSelector: string, handleFormSubmit: HandleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
    this.submitButton = this.formElement.querySelector(".popup__button") as HTMLButtonElement;
    this.submitButtonText = this.submitButton.textContent ?? "";
  }

  // Recorre los inputs y devuelve un objeto { nombreDelCampo: valor }
  private getInputValues(): FormValues {
    const inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(".popup__input")
    );
    const values: FormValues = {};
    inputList.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });
    return values;
  }

  // Cambia el texto del botón mientras se envían los datos al servidor
  renderLoading(isLoading: boolean, loadingText = "Guardando..."): void {
    this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
  }

  private handleSubmit = (evt: SubmitEvent): void => {
    evt.preventDefault();
    this.handleFormSubmit(this.getInputValues());
  };

  // Sobrescribe setEventListeners() para además escuchar el envío del formulario
  setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  // Sobrescribe close() para reiniciar el formulario al cerrar el popup
  close(): void {
    super.close();
    this.formElement.reset();
  }
}