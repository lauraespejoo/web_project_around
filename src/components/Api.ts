import type {
  UserData,
  UserFormData,
  AvatarFormData,
  CardData,
  CardFormData,
} from "../types/types.js";

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

// Clase responsable exclusiva de la comunicación con el servidor
export class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Hace la solicitud y comprueba la respuesta del servidor
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      ...options,
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo(): Promise<UserData> {
    return await this.request<UserData>("/users/me");
  }

  async getInitialCards(): Promise<CardData[]> {
    return await this.request<CardData[]>("/cards");
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    return await this.request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async addCard(data: CardFormData): Promise<CardData> {
    return await this.request<CardData>("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteCard(cardId: string): Promise<void> {
    await this.request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  async changeLikeStatus(cardId: string, like: boolean): Promise<CardData> {
    return await this.request<CardData>(`/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
    });
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    return await this.request<UserData>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}