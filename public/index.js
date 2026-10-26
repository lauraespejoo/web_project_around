var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
// ---- API ----
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "48a8336a-1a4e-4f2a-820c-f312cbdd6efa",
        "Content-Type": "application/json",
    },
});
// ---- Usuario actual ----
let userId = "";
// ---- Información del usuario ----
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
// ---- Popup de imagen ----
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// ---- Popup de confirmación para eliminar ----
const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();
// ---- Popup de edición de perfil ----
const editPopup = new PopupWithForm("#edit-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    editPopup.renderLoading(true);
    try {
        const updatedUser = yield api.updateUserInfo({
            name: values.name,
            about: values.description,
        });
        userInfo.setUserInfo({ name: updatedUser.name, description: updatedUser.about });
        editPopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        editPopup.renderLoading(false);
    }
}));
editPopup.setEventListeners();
// ---- Tarjetas ----
function createCard(data) {
    const card = new Card(data, userId, "#card-template", (cardData) => {
        imagePopup.open(cardData);
    }, (cardId, like) => api.changeLikeStatus(cardId, like), (cardId, removeCard) => {
        deletePopup.setSubmitAction(() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield api.deleteCard(cardId);
                removeCard();
                deletePopup.close();
            }
            catch (err) {
                console.error(err);
            }
        }));
        deletePopup.open();
    });
    return card.generateCard();
}
const cardSection = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.appendItem(cardElement);
    },
}, ".cards__list");
// ---- Popup de nueva tarjeta ----
const newCardPopup = new PopupWithForm("#new-card-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    newCardPopup.renderLoading(true);
    try {
        const newCard = yield api.addCard({
            name: values["place-name"],
            link: values.link,
        });
        cardSection.addItem(createCard(newCard));
        newCardPopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        newCardPopup.renderLoading(false);
    }
}));
newCardPopup.setEventListeners();
// ---- Popup de cambio de avatar ----
const avatarPopup = new PopupWithForm("#avatar-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    avatarPopup.renderLoading(true);
    try {
        const updatedUser = yield api.updateAvatar({ avatar: values.avatar });
        userInfo.setAvatar(updatedUser.avatar);
        avatarPopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        avatarPopup.renderLoading(false);
    }
}));
avatarPopup.setEventListeners();
// ---- Validación de formularios ----
const editFormElement = document.querySelector("#edit-profile-form");
const newCardFormElement = document.querySelector("#new-card-form");
const avatarFormElement = document.querySelector("#avatar-form");
const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
editFormValidator.enableValidation();
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarFormElement);
avatarFormValidator.enableValidation();
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
const avatarButton = document.querySelector(".profile__avatar-button");
avatarButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
// ---- Carga inicial de datos del servidor ----
function loadInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, cards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            userId = userData._id;
            userInfo.setUserInfo({ name: userData.name, description: userData.about });
            userInfo.setAvatar(userData.avatar);
            cardSection.renderItems(cards);
        }
        catch (err) {
            console.error("Fallo al cargar datos iniciales:", err);
        }
    });
}
loadInitialData();
