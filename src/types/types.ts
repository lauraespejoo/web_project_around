// Estructura de datos de una tarjeta
export interface CardData {
  name: string;
  link: string;
}

// Estructura de datos del usuario (perfil)
export interface UserData {
  name: string;
  description: string;
}

// Selectores que necesita la clase UserInfo
export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
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
  items: T[];
  renderer: RendererFunction<T>;
}
