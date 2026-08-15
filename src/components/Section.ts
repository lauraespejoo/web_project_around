import type { SectionConfig, RendererFunction } from "../types/types.js";

// Renderiza una lista de elementos dentro de un contenedor.
// No sabe nada sobre tarjetas: recibe el marcado ya construido a través
// de la función "renderer" (acoplamiento débil).
export class Section<T> {
  private items: T[];
  private renderer: RendererFunction<T>;
  private container: HTMLElement;

  constructor({ items, renderer }: SectionConfig<T>, containerSelector: string) {
    this.items = items;
    this.renderer = renderer;

    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) {
      throw new Error(`No se encontró el contenedor ${containerSelector}`);
    }
    this.container = container;
  }

  // Renderiza todos los elementos iniciales llamando al renderer por cada uno
  renderItems(): void {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  // Agrega un único elemento ya construido al contenedor
  addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}
