import type { FormValidatorConfig } from "../types/types.js";

// Configuración por defecto para todos los formularios del proyecto
export const defaultFormConfig: FormValidatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

