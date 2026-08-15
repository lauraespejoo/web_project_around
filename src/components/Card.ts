import type { CardData, HandleCardClick } from "../types/types.js";

// Construye una tarjeta individual a partir de una plantilla HTML.
// No sabe nada sobre popups: al hacer clic en la imagen simplemente
// avisa al exterior a través de handleCardClick (acoplamiento débil).
export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: HandleCardClick;
  private element!: HTMLElement;

  constructor(data: CardData, templateSelector: string, handleCardClick: HandleCardClick) {
    this.name = data.name;
    this.link = data.link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(this.templateSelector);
    if (!template) {
      throw new Error(`No se encontró la plantilla ${this.templateSelector}`);
    }
    const cardElement = template.content.querySelector<HTMLElement>(".card");
    if (!cardElement) {
      throw new Error("La plantilla no contiene un elemento .card");
    }
    return cardElement.cloneNode(true) as HTMLElement;
  }

  // Función flecha como propiedad para conservar el contexto de "this"
  // al pasarla como callback a addEventListener
  private handleLikeClick = (): void => {
    const likeButton = this.element.querySelector(".card__like-button") as HTMLElement;
    likeButton.classList.toggle("card__like-button_is-active");
  };

  private handleDeleteClick = (): void => {
    this.element.remove();
  };

  private setEventListeners(): void {
    const likeButton = this.element.querySelector<HTMLButtonElement>(".card__like-button");
    const deleteButton = this.element.querySelector<HTMLButtonElement>(".card__delete-button");
    const imageElement = this.element.querySelector<HTMLImageElement>(".card__image");

    likeButton?.addEventListener("click", this.handleLikeClick);
    deleteButton?.addEventListener("click", this.handleDeleteClick);
    imageElement?.addEventListener("click", () => {
      this.handleCardClick({ name: this.name, link: this.link });
    });
  }

  // Ensambla la tarjeta y devuelve el elemento listo para insertar en el DOM
  generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const imageElement = this.element.querySelector<HTMLImageElement>(".card__image");
    const titleElement = this.element.querySelector<HTMLElement>(".card__title");

    if (imageElement) {
      imageElement.src = this.link;
      imageElement.alt = this.name;
    }
    if (titleElement) {
      titleElement.textContent = this.name;
    }

    this.setEventListeners();
    return this.element;
  }
}
