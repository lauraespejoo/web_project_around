// ---------- Interfaces ----------

import type { UserData, UserFormData, AvatarFormData, CardData, CardFormData } from "../types/types.js";

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

// ---------- Clase Api ----------

export class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Método privado que hace la solicitud y revisa la respuesta.
  // Así no repetimos el fetch + res.ok en cada método.
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

  // 1. Información del usuario
  async getUserInfo(): Promise<UserData> {
    return this.request<UserData>("/users/me");
  }

  // 2. Tarjetas iniciales
  async getInitialCards(): Promise<CardData[]> {
    return this.request<CardData[]>("/cards");
  }

  // 3. Editar perfil
  async updateUserInfo(data: UserFormData): Promise<UserData> {
    return this.request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // 4. Agregar tarjeta
  async addCard(data: CardFormData): Promise<CardData> {
    return this.request<CardData>("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // 7. Eliminar tarjeta
  async deleteCard(cardId: string): Promise<void> {
    await this.request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // 8. Dar o quitar "me gusta"
  // Si like es true se envía PUT (dar like); si es false, DELETE (quitarlo).
  async changeLikeStatus(cardId: string, like: boolean): Promise<CardData> {
    return this.request<CardData>(`/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
    });
  }

  // 9. Actualizar avatar
  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    return this.request<UserData>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}