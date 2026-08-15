import type { UserData, UserInfoSelectors } from "../types/types.js";

// Responsable exclusivo de leer y escribir la información del usuario
// (nombre y descripción) en la página
export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;

  constructor({ nameSelector, descriptionSelector }: UserInfoSelectors) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.descriptionElement = document.querySelector(descriptionSelector) as HTMLElement;
  }

  getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      description: this.descriptionElement.textContent ?? "",
    };
  }

  setUserInfo({ name, description }: UserData): void {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = description;
  }
}
