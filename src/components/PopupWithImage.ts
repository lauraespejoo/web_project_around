import { Popup } from "./Popup.js";
import type { CardData } from "../types/types.js";

// Popup hijo: muestra la imagen y el título de una tarjeta en grande
export class PopupWithImage extends Popup {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this.imageElement = this.popupElement.querySelector(".popup__image") as HTMLImageElement;
    this.captionElement = this.popupElement.querySelector(".popup__caption") as HTMLElement;
  }

  // Sobrescribe open() del padre para rellenar la imagen antes de mostrarla
  open(data: CardData): void {
    this.imageElement.src = data.link;
    this.imageElement.alt = data.name;
    this.captionElement.textContent = data.name;
    super.open();
  }
}
