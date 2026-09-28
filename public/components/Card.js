var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Construye una tarjeta individual a partir de una plantilla HTML.
// No sabe nada sobre popups ni sobre la API: avisa al exterior
// a través de callbacks (acoplamiento débil).
export class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleLike, handleDelete) {
        // Función flecha como propiedad para conservar el contexto de "this"
        // al pasarla como callback a addEventListener
        this.handleLikeClick = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCard = yield this.handleLike(this.data._id, !this.isLiked);
                this.isLiked = updatedCard.isLiked;
                this.updateLikeView();
            }
            catch (err) {
                console.error(err);
            }
        });
        // No borra directamente: avisa al exterior (que abrirá el popup de confirmación)
        // y le pasa una función para quitar la tarjeta cuando el servidor confirme
        this.handleDeleteClick = () => {
            this.handleDelete(this.data._id, () => this.element.remove());
        };
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
    getTemplate() {
        const template = document.querySelector(this.templateSelector);
        if (!template) {
            throw new Error(`No se encontró la plantilla ${this.templateSelector}`);
        }
        const cardElement = template.content.querySelector(".card");
        if (!cardElement) {
            throw new Error("La plantilla no contiene un elemento .card");
        }
        return cardElement.cloneNode(true);
    }
    // Pinta el corazón lleno o vacío según this.isLiked
    updateLikeView() {
        this.likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
    }
    setEventListeners() {
        const deleteButton = this.element.querySelector(".card__delete-button");
        const imageElement = this.element.querySelector(".card__image");
        this.likeButton.addEventListener("click", this.handleLikeClick);
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", this.handleDeleteClick);
        imageElement === null || imageElement === void 0 ? void 0 : imageElement.addEventListener("click", () => {
            this.handleCardClick(this.data);
        });
    }
    // Ensambla la tarjeta y devuelve el elemento listo para insertar en el DOM
    generateCard() {
        var _a;
        this.element = this.getTemplate();
        this.likeButton = this.element.querySelector(".card__like-button");
        const imageElement = this.element.querySelector(".card__image");
        const titleElement = this.element.querySelector(".card__title");
        if (imageElement) {
            imageElement.src = this.link;
            imageElement.alt = this.name;
        }
        if (titleElement) {
            titleElement.textContent = this.name;
        }
        // La papelera solo se muestra en las tarjetas que creó el usuario actual
        if (this.data.owner !== this.userId) {
            (_a = this.element.querySelector(".card__delete-button")) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.updateLikeView();
        this.setEventListeners();
        return this.element;
    }
}
