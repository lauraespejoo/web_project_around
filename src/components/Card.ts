import type {
  CardData,
  HandleCardClick,
  HandleLikeClick,
  HandleDeleteClick,
} from "../types/types.js";

// Construye una tarjeta individual a partir de una plantilla HTML.
// No sabe nada sobre popups ni sobre la API: avisa al exterior
// a través de callbacks (acoplamiento débil).
export class Card {
  private data: CardData;
  private name: string;
  private link: string;
  private isLiked: boolean;
  private userId: string;
  private templateSelector: string;
  private handleCardClick: HandleCardClick;
  private handleLike: HandleLikeClick;
  private handleDelete: HandleDeleteClick;
  private element!: HTMLElement;
  private likeButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    userId: string,
    templateSelector: string,
    handleCardClick: HandleCardClick,
    handleLike: HandleLikeClick,
    handleDelete: HandleDeleteClick,
  ) {
    this.data = data;
    this.name = data.name;
    this.link = data.link;
    this.isLiked = data.isLiked;
    this.userId = userId;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleLike = handleLike;
    this.handleDelete = handleDelete;
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

  // Pinta el corazón lleno o vacío según this.isLiked
  private updateLikeView(): void {
    this.likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
  }

  // Función flecha como propiedad para conservar el contexto de "this"
  // al pasarla como callback a addEventListener
  private handleLikeClick = async (): Promise<void> => {
    try {
      const updatedCard = await this.handleLike(this.data._id, !this.isLiked);
      this.isLiked = updatedCard.isLiked;
      this.updateLikeView();
    } catch (err) {
      console.error(err);
    }
  };

  // No borra directamente: avisa al exterior (que abrirá el popup de confirmación)
  // y le pasa una función para quitar la tarjeta cuando el servidor confirme
  private handleDeleteClick = (): void => {
    this.handleDelete(this.data._id, () => this.element.remove());
  };

  private setEventListeners(): void {
    const deleteButton = this.element.querySelector<HTMLButtonElement>(".card__delete-button");
    const imageElement = this.element.querySelector<HTMLImageElement>(".card__image");

    this.likeButton.addEventListener("click", this.handleLikeClick);
    deleteButton?.addEventListener("click", this.handleDeleteClick);
    imageElement?.addEventListener("click", () => {
      this.handleCardClick(this.data);
    });
  }

  // Ensambla la tarjeta y devuelve el elemento listo para insertar en el DOM
  generateCard(): HTMLElement {
    this.element = this.getTemplate();
    this.likeButton = this.element.querySelector(".card__like-button") as HTMLButtonElement;

    const imageElement = this.element.querySelector<HTMLImageElement>(".card__image");
    const titleElement = this.element.querySelector<HTMLElement>(".card__title");

    if (imageElement) {
      imageElement.src = this.link;
      imageElement.alt = this.name;
    }
    if (titleElement) {
      titleElement.textContent = this.name;
    }

    // La papelera solo se muestra en las tarjetas que creó el usuario actual
    if (this.data.owner !== this.userId) {
      this.element.querySelector(".card__delete-button")?.remove();
    }

    this.updateLikeView();
    this.setEventListeners();
    return this.element;
  }
}