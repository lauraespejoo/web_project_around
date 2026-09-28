import type { UserInfoData, UserInfoSelectors } from "../types/types.js";

// Responsable exclusivo de leer y escribir la información del usuario
// (nombre, descripción y foto) en la página
export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;
  private avatarElement: HTMLImageElement;

  constructor({ nameSelector, descriptionSelector, avatarSelector }: UserInfoSelectors) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.descriptionElement = document.querySelector(descriptionSelector) as HTMLElement;
    this.avatarElement = document.querySelector(avatarSelector) as HTMLImageElement;
  }

  getUserInfo(): UserInfoData {
    return {
      name: this.nameElement.textContent ?? "",
      description: this.descriptionElement.textContent ?? "",
    };
  }

  setUserInfo({ name, description }: UserInfoData): void {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = description;
  }

  setAvatar(link: string): void {
    this.avatarElement.src = link;
  }
}