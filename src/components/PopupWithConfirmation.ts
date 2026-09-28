import { Popup } from "./Popup.js";

// Popup hijo: pide confirmación antes de realizar una acción (eliminar una tarjeta).
// La acción a ejecutar se define cada vez que se abre, con setSubmitAction(),
// porque depende de qué tarjeta se quiere borrar.
export class PopupWithConfirmation extends Popup {
  private formElement: HTMLFormElement;
  private handleConfirm: (() => void) | null = null;

  constructor(popupSelector: string) {
    super(popupSelector);
    this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
  }

  // Guarda la función que se ejecutará al hacer clic en "Sí"
  setSubmitAction(action: () => void): void {
    this.handleConfirm = action;
  }

  private handleSubmit = (evt: SubmitEvent): void => {
    evt.preventDefault();
    this.handleConfirm?.();
  };

  // Sobrescribe setEventListeners() para además escuchar el botón "Sí"
  setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", this.handleSubmit);
  }
}