import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import type { CardData, FormValues } from "./types/types.js";
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
const editPopup = new PopupWithForm("#edit-popup", async (values: FormValues) => {
  editPopup.renderLoading(true);
  try {
    const updatedUser = await api.updateUserInfo({
      name: values.name,
      about: values.description,
    });
    userInfo.setUserInfo({ name: updatedUser.name, description: updatedUser.about });
    editPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    editPopup.renderLoading(false);
  }
});
editPopup.setEventListeners();

// ---- Tarjetas ----
function createCard(data: CardData): HTMLElement {
  const card = new Card(
    data,
    userId,
    "#card-template",
    (cardData) => {
      imagePopup.open(cardData);
    },
    (cardId, like) => api.changeLikeStatus(cardId, like),
    (cardId, removeCard) => {
      deletePopup.setSubmitAction(async () => {
        try {
          await api.deleteCard(cardId);
          removeCard();
          deletePopup.close();
        } catch (err) {
          console.error(err);
        }
      });
      deletePopup.open();
    },
  );
  return card.generateCard();
}

const cardSection = new Section<CardData>(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.appendItem(cardElement);
    },
  },
  ".cards__list"
);

// ---- Popup de nueva tarjeta ----
const newCardPopup = new PopupWithForm("#new-card-popup", async (values: FormValues) => {
  newCardPopup.renderLoading(true);
  try {
    const newCard = await api.addCard({
      name: values["place-name"],
      link: values.link,
    });
    cardSection.addItem(createCard(newCard));
    newCardPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    newCardPopup.renderLoading(false);
  }
});
newCardPopup.setEventListeners();

// ---- Popup de cambio de avatar ----
const avatarPopup = new PopupWithForm("#avatar-popup", async (values: FormValues) => {
  avatarPopup.renderLoading(true);
  try {
    const updatedUser = await api.updateAvatar({ avatar: values.avatar });
    userInfo.setAvatar(updatedUser.avatar);
    avatarPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    avatarPopup.renderLoading(false);
  }
});
avatarPopup.setEventListeners();

// ---- Validación de formularios ----
const editFormElement = document.querySelector("#edit-profile-form") as HTMLFormElement;
const newCardFormElement = document.querySelector("#new-card-form") as HTMLFormElement;
const avatarFormElement = document.querySelector("#avatar-form") as HTMLFormElement;

const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(defaultFormConfig, avatarFormElement);
avatarFormValidator.enableValidation();

// ---- Botones que abren los popups ----
const editButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  (editFormElement.elements.namedItem("name") as HTMLInputElement).value = data.name;
  (editFormElement.elements.namedItem("description") as HTMLInputElement).value =
    data.description;
  editFormValidator.resetValidation();
  editPopup.open();
});

const addButton = document.querySelector(".profile__add-button") as HTMLButtonElement;
addButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

const avatarButton = document.querySelector(".profile__avatar-button") as HTMLButtonElement;
avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

// ---- Carga inicial de datos del servidor ----
async function loadInitialData(): Promise<void> {
  try {
    const [userData, cards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userId = userData._id;
    userInfo.setUserInfo({ name: userData.name, description: userData.about });
    userInfo.setAvatar(userData.avatar);

    cardSection.renderItems(cards);
  } catch (err) {
    console.error("Fallo al cargar datos iniciales:", err);
  }
}

loadInitialData();