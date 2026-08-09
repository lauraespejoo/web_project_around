// Verificamos que el script está conectado a index.html
console.log("El script está conectado");

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

// Recorremos el array e imprimimos cada nombre en consola
initialCards.forEach((card) => {
  console.log(card.name);
});

// ---- Etapa 2: Editar perfil ----

// 1. Selecciona los elementos del DOM que vamos a necesitar
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

// 2. Funciones reutilizables para abrir/cerrar cualquier modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// 3. Rellena los campos del formulario con los valores actuales de la página
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Rellena el formulario y abre el modal de edición
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// Maneja el envío del formulario: guarda los cambios y cierra el modal
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// 6. Escucha los clics y el envío del formulario
editButton.addEventListener("click", handleOpenEditModal);
editPopupCloseButton.addEventListener("click", () => closeModal(editPopup));
editProfileForm.addEventListener("submit", handleProfileFormSubmit);