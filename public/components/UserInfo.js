// Responsable exclusivo de leer y escribir la información del usuario
// (nombre y descripción) en la página
export class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(descriptionSelector);
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this.nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            description: (_b = this.descriptionElement.textContent) !== null && _b !== void 0 ? _b : "",
        };
    }
    setUserInfo({ name, description }) {
        this.nameElement.textContent = name;
        this.descriptionElement.textContent = description;
    }
}
