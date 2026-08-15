import { Popup } from "./Popup.js";
// Popup hijo: muestra la imagen y el título de una tarjeta en grande
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageElement = this.popupElement.querySelector(".popup__image");
        this.captionElement = this.popupElement.querySelector(".popup__caption");
    }
    // Sobrescribe open() del padre para rellenar la imagen antes de mostrarla
    open(data) {
        this.imageElement.src = data.link;
        this.imageElement.alt = data.name;
        this.captionElement.textContent = data.name;
        super.open();
    }
}
