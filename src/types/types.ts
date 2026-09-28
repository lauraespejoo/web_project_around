// Tarjeta completa que devuelve el servidor
export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

// Datos que se envían al crear una tarjeta
export interface CardFormData {
  name: string;
  link: string;
}

// Datos del perfil que se muestran en la página
export interface UserInfoData {
  name: string;
  description: string;
}

// Usuario completo que devuelve el servidor
export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

// Datos que se envían al editar el perfil
export interface UserFormData {
  name: string;
  about: string;
}

// Datos que se envían al cambiar la foto
export interface AvatarFormData {
  avatar: string;
}

// Selectores que necesita la clase UserInfo
export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
  avatarSelector: string;
}

// Configuración que recibe FormValidator (selectores y clases CSS)
export interface FormValidatorConfig {
  formSelector: string;
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

// Objeto con los valores de un formulario: { nombreDelCampo: valor }
export interface FormValues {
  [key: string]: string;
}

// Firma de la función que se ejecuta al hacer clic en una tarjeta
export type HandleCardClick = (data: CardData) => void;

// Firma de la función que se ejecuta al enviar un formulario dentro de un popup
export type HandleFormSubmit = (values: FormValues) => void;

// Firma de la función "renderer" que usa la clase Section
export type RendererFunction<T> = (item: T) => void;

// Objeto de configuración que recibe la clase Section en su constructor
export interface SectionConfig<T> {
  renderer: RendererFunction<T>;
}

// Firma de la función que da o quita "me gusta" en el servidor
export type HandleLikeClick = (cardId: string, like: boolean) => Promise<CardData>;

// Firma de la función que se ejecuta al hacer clic en la papelera.
// Recibe el id de la tarjeta y una función que la quita de la página.
export type HandleDeleteClick = (cardId: string, removeCard: () => void) => void;