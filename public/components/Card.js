// Construye una tarjeta individual a partir de una plantilla HTML.
// No sabe nada sobre popups: al hacer clic en la imagen simplemente
// avisa al exterior a través de handleCardClick (acoplamiento débil).
export class Card {
    constructor(data, templateSelector, handleCardClick) {
        // Función flecha como propiedad para conservar el contexto de "this"
        // al pasarla como callback a addEventListener
        this.handleLikeClick = () => {
            const likeButton = this.element.querySelector(".card__like-button");
            likeButton.classList.toggle("card__like-button_is-active");
        };
        this.handleDeleteClick = () => {
            this.element.remove();
        };
        this.name = data.name;
        this.link = data.link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
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
    setEventListeners() {
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        const imageElement = this.element.querySelector(".card__image");
        likeButton === null || likeButton === void 0 ? void 0 : likeButton.addEventListener("click", this.handleLikeClick);
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", this.handleDeleteClick);
        imageElement === null || imageElement === void 0 ? void 0 : imageElement.addEventListener("click", () => {
            this.handleCardClick({ name: this.name, link: this.link });
        });
    }
    // Ensambla la tarjeta y devuelve el elemento listo para insertar en el DOM
    generateCard() {
        this.element = this.getTemplate();
        const imageElement = this.element.querySelector(".card__image");
        const titleElement = this.element.querySelector(".card__title");
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
