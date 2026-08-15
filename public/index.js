import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
// ---- Información del usuario ----
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
// ---- Popup de imagen ----
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// ---- Popup de edición de perfil ----
const editPopup = new PopupWithForm("#edit-popup", (values) => {
    userInfo.setUserInfo({ name: values.name, description: values.description });
    editPopup.close();
});
editPopup.setEventListeners();
// ---- Tarjetas ----
function createCard(data) {
    const card = new Card(data, "#card-template", (cardData) => {
        imagePopup.open(cardData);
    });
    return card.generateCard();
}
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
// ---- Popup de nueva tarjeta ----
const newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
    const cardData = { name: values["place-name"], link: values.link };
    const cardElement = createCard(cardData);
    cardSection.addItem(cardElement);
    newCardPopup.close();
});
newCardPopup.setEventListeners();
cardSection.renderItems();
// ---- Validación de formularios ----
const editFormElement = document.querySelector("#edit-profile-form");
const newCardFormElement = document.querySelector("#new-card-form");
const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
editFormValidator.enableValidation();
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardFormValidator.enableValidation();
// ---- Botones que abren los popups ----
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    editFormElement.elements.namedItem("name").value = data.name;
    editFormElement.elements.namedItem("description").value =
        data.description;
    editFormValidator.resetValidation();
    editPopup.open();
});
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});
