import { Popup } from "./Popup.js";
import type { FormValues, HandleFormSubmit } from "../types/types.js";

// Popup hijo: gestiona el formulario dentro de un popup (editar perfil,
// agregar tarjeta, etc.) y delega el envío al controlador externo
// handleFormSubmit (acoplamiento débil).
export class PopupWithForm extends Popup {
  private handleFormSubmit: HandleFormSubmit;
  private formElement: HTMLFormElement;

  constructor(popupSelector: string, handleFormSubmit: HandleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
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

  private handleSubmit = (evt: SubmitEvent): void => {
    evt.preventDefault();
    this.handleFormSubmit(this.getInputValues());
    this.formElement.reset();
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
