import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ui-duvan-jimenez.css.js';

/**
 * [LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <ui-duvan-jimenez></ui-duvan-jimenez>
 * ```
 */
export class UiDuvanJimenez extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      name: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.name = 'Cells en la cual vemos un poco su uso';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('ui-duvan-jimenez-shared-styles'),
    ];
  }

  render() {
    return html`
      <h1>esto es una prueba de <span class="name">${this.name}</span></h1>
      <p>esto es un componente y lo encadenamos<span class="name">${this.name} </p>
      <div class="card">
      <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Imagen demo" />
      <h2>esto es una prueba de <span style="color: yellow">Cells</span></h2>
      <p>esto es un componente y lo encadenamos <span style="color: yellow">Cells</span></p>
      <button>Ver más</button>
    </div>
    <footer class="footer">
      por Duván Jiménez
      
    </footer>
      <slot></slot>
      
    `;
  }
}
