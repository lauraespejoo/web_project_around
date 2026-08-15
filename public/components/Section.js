// Renderiza una lista de elementos dentro de un contenedor.
// No sabe nada sobre tarjetas: recibe el marcado ya construido a través
// de la función "renderer" (acoplamiento débil).
export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor ${containerSelector}`);
        }
        this.container = container;
    }
    // Renderiza todos los elementos iniciales llamando al renderer por cada uno
    renderItems() {
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }
    // Agrega un único elemento ya construido al contenedor
    addItem(element) {
        this.container.prepend(element);
    }
}
