// ---------- Interfaces ----------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------- Clase Api ----------
export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    // Método privado que hace la solicitud y revisa la respuesta.
    // Así no repetimos el fetch + res.ok en cada método.
    request(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, options = {}) {
            const res = yield fetch(`${this.baseUrl}${endpoint}`, Object.assign({ headers: this.headers }, options));
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    // 1. Información del usuario
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("/users/me");
        });
    }
    // 2. Tarjetas iniciales
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("/cards");
        });
    }
    // 3. Editar perfil
    updateUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("/users/me", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
        });
    }
    // 4. Agregar tarjeta
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("/cards", {
                method: "POST",
                body: JSON.stringify(data),
            });
        });
    }
    // 7. Eliminar tarjeta
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request(`/cards/${cardId}`, {
                method: "DELETE",
            });
        });
    }
    // 8. Dar o quitar "me gusta"
    // Si like es true se envía PUT (dar like); si es false, DELETE (quitarlo).
    changeLikeStatus(cardId, like) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(`/cards/${cardId}/likes`, {
                method: like ? "PUT" : "DELETE",
            });
        });
    }
    // 9. Actualizar avatar
    updateAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("/users/me/avatar", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
        });
    }
}
