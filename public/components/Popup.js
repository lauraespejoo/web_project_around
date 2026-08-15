// Clase padre para cualquier ventana emergente (popup).
// Gestiona apertura/cierre y el cierre con la tecla Esc o al hacer clic
// fuera del contenido del popup.
export class Popup {
    constructor(popupSelector) {
        // Función flecha como propiedad: conserva el "this" al usarla como
        // callback de addEventListener/removeEventListener
        this.handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        };
        const popupElement = document.querySelector(popupSelector);
        if (!popupElement) {
            throw new Error(`No se encontró el popup ${popupSelector}`);
        }
        this.popupElement = popupElement;
    }
    // El parámetro opcional permite que las subclases (como PopupWithImage)
    // sobrescriban este método aceptando los datos que necesiten
    open(data) {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    // Agrega los detectores de clic para cerrar el popup: en el botón de
    // cerrar y en el área sombreada (overlay)
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}
