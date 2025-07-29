import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaHelp } from '@bbva-web-components/bbva-foundations-icons';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import '@cells-components/cells-template-paper-drawer-panel';

import styles from './resume-page-styles.js';

class ResumePage extends intl(CellsPage) {
  static get is() {
    return 'resume-page';
  }

  static get properties() {
    return {
      pageState: { type: Object, attribute: false },
      pokemon: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.pokemon = {};

    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.subscribe('pokemon', (pokemon) => {
      this.pokemon = pokemon;
    });
  }

  _goBack() {
    this.navigate('habilidades-pokemon');
  }

  _finish() {
    console.log('log login');
    this.navigate('login');
  }

  render() {
    const nombre = this.pokemon?.name || 'N/A';
    const imagen = this.pokemon?.sprites?.front_default || '';
    const ataque = this.pokemon?.moves?.[0]?.move?.name || 'N/A';
    const elemento = this.pokemon?.types?.[0]?.type?.name || 'N/A';
    const habilidad = this.pokemon?.abilities?.[0]?.ability?.name || 'N/A';
    const altura = this.pokemon?.height ? `${this.pokemon.height} dm` : 'N/A';
    const peso = this.pokemon?.weight ? `${this.pokemon.weight} hg` : 'N/A';

    return html`
      <cells-template-paper-drawer-panel page-title="Resumen Pokémon" state="active">
        <div slot="app__header">
          <h1>Resumen del Pokémon</h1>
        </div>

        <div slot="app__main">
          <p><strong>Nombre:</strong> ${nombre}</p>
          ${imagen ? html`<img src="${imagen}" alt="Imagen de ${nombre}" style="width:150px;height:auto;" />` : ''}
          <p><strong>Ataque:</strong> ${ataque}</p>
          <p><strong>Elemento:</strong> ${elemento}</p>
          <p><strong>Habilidad:</strong> ${habilidad}</p>
          <p><strong>Altura:</strong> ${altura}</p>
          <p><strong>Peso:</strong> ${peso}</p>

          <bbva-button-default text="Atrás" @click=${this._goBack}></bbva-button-default>
          <bbva-button-default text="Fin" @click=${this._finish}></bbva-button-default>
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }
}

window.customElements.define(ResumePage.is, ResumePage);