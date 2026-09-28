var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Clase responsable exclusiva de la comunicación con el servidor
export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    // Hace la solicitud y comprueba la respuesta del servidor
    request(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, options = {}) {
            const res = yield fetch(`${this.baseUrl}${endpoint}`, Object.assign({ headers: this.headers }, options));
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/users/me");
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/cards");
        });
    }
    updateUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/users/me", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
        });
    }
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/cards", {
                method: "POST",
                body: JSON.stringify(data),
            });
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request(`/cards/${cardId}`, {
                method: "DELETE",
            });
        });
    }
    changeLikeStatus(cardId, like) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(`/cards/${cardId}/likes`, {
                method: like ? "PUT" : "DELETE",
            });
        });
    }
    updateAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/users/me/avatar", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
        });
    }
}
