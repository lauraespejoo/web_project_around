// Array de tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
 
// ---- Etapa 2: Editar perfil ----
 
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
 
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
 
const editProfileForm = editPopup.querySelector("#edit-profile-form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
 
// Funciones reutilizables para abrir/cerrar cualquier modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
 
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
 
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}
 
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}
 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}
 
editButton.addEventListener("click", handleOpenEditModal);
editPopupCloseButton.addEventListener("click", () => closeModal(editPopup));
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
 
// ---- Etapa final: tarjetas dinámicas ----
 
// Selectores de nivel superior
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
 
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const placeNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newCardForm.querySelector(".popup__input_type_url");
 
const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
 
// Alterna el estado "me gusta" de una tarjeta
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
 
// Elimina la tarjeta del DOM
function handleDeleteButtonClick(evt) {
  evt.target.closest(".card").remove();
}
 
// Crea un elemento de tarjeta a partir de un objeto de datos { name, link }
function getCardElement({ name = "Sin título", link = "./images/placeholder.jpg" } = {}) {
  const cardElement = cardTemplate.cloneNode(true);
 
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
 
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
 
  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
 
  cardImage.addEventListener("click", () => {
    imagePopupImage.src = cardImage.src;
    imagePopupImage.alt = cardImage.alt;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  });
 
  return cardElement;
}
 
// Crea la tarjeta con getCardElement() y la antepone al contenedor
function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}
 
// Renderiza las tarjetas iniciales
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});
 
// Abrir/cerrar el popup "Agregar tarjeta"
addButton.addEventListener("click", () => openModal(newCardPopup));
newCardPopupCloseButton.addEventListener("click", () =>
  closeModal(newCardPopup)
);
 
// Crea la tarjeta nueva al enviar el formulario y cierra el popup
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, linkInput.value, cardsList);
  evt.target.reset();
  closeModal(newCardPopup);
}
 
newCardForm.addEventListener("submit", handleCardFormSubmit);
 
// Cerrar el popup de imagen ampliada
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));
 
// ---- Cerrar cualquier popup con Escape o con clic en el overlay ----
 
// Se agrega una sola vez: busca el popup abierto en el momento de la tecla,
// así no hace falta agregar/quitar el listener cada vez que se abre un modal
function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
 
document.addEventListener("keydown", handleEscapeClose);
 
// Cierra el popup si el clic fue directamente sobre el fondo (overlay),
// no sobre su contenido
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
 
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});