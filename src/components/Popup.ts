// Clase padre para cualquier ventana emergente (popup).
// Gestiona apertura/cierre y el cierre con la tecla Esc o al hacer clic
// fuera del contenido del popup.
export class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    const popupElement = document.querySelector<HTMLElement>(popupSelector);
    if (!popupElement) {
      throw new Error(`No se encontró el popup ${popupSelector}`);
    }
    this.popupElement = popupElement;
  }

  // Función flecha como propiedad: conserva el "this" al usarla como
  // callback de addEventListener/removeEventListener
  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // El parámetro opcional permite que las subclases (como PopupWithImage)
  // sobrescriban este método aceptando los datos que necesiten
  open(data?: unknown): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  // Agrega los detectores de clic para cerrar el popup: en el botón de
  // cerrar y en el área sombreada (overlay)
  setEventListeners(): void {
    const closeButton = this.popupElement.querySelector<HTMLButtonElement>(".popup__close");
    closeButton?.addEventListener("click", () => this.close());

    this.popupElement.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
