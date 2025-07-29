import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaHelp } from '@bbva-web-components/bbva-foundations-icons';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';

import '../../../components/ui/cells-co-ejercicio-cells-ui/cells-co-ejercicio-cells-ui.js';
import '../../../components/dm/cells-co-pokemon-dm/cells-co-pokemon-dm.js';

const DEFAULT_I18N_KEYS = {
  loginTitle: 'login-page.title',
  help: 'login-page.help',
  userInputLabel: 'login-page.user-input-label',
  userPasswordLabel: 'login-page.user-password-label',
  button: 'login-page.button',
  forgetPassword: 'login-page.forget-password',
  clientButton: 'login-page.client-button',
};

class ataquepokemonPage extends intl(CellsPage) {
  static get is() {
    return 'ataque-pokemon-page';
  }

  static get properties() {
    return {
      pageState: { type: Object, attribute: false },
      language: { type: String },
      dark: { type: String },
      i18nKeys: { type: Object, attribute: false },
      pokemon: { type: Object, attribute: false }
    };
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.pokemon = {};

    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.subscribe('pokemon', (pokemon) => {
      this.pokemon = pokemon;
    });

    this.dispatchEvent(
      new CustomEvent('application-started', {
        bubbles: true,
        composed: true,
      })
    );
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }
    return super.update && super.update(props);
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    this.language = localStorage.getItem('language') || window.IntlMsg.lang;
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  _loadPokemon(e) {
    this.pokemon = e.detail;
  }

  _errorPokemon(e) {
    console.error('Error getting pokemon', e);
  }

  _goelemento() {
    console.log('log elemento');
    this.publish('pokemon', this.pokemon);
    this.navigate('elemento-pokemon');
  }

  _goBack() {
    this.navigate('login');
  }

  render() {
    return html`
      <cells-co-pokemon-dm
        id="dmPokemon"
        @fetch-success=${this._loadPokemon}
        @fetch-error=${this._errorPokemon}>
      </cells-co-pokemon-dm>

      <cells-template-paper-drawer-panel page-title="${this.t(this.i18nKeys.loginTitle)}" state="active">
        <div slot="app__header">
          <h1>Ataque del Pokémon</h1>
        </div>

        <div slot="app__main">
          <p><strong>Nombre:</strong> ${this.pokemon?.name || 'N/A'}</p>
          <p><strong>Ataque:</strong> ${this.pokemon?.stats?.[1]?.base_stat || 'N/A'}</p>

          <bbva-button-default
            text="Atrás"
            @click=${this._goBack}>
          </bbva-button-default>

          <bbva-button-default
            text="Próxima pantalla"
            @click=${this._goelemento}>
          </bbva-button-default>
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }
}

window.customElements.define(ataquepokemonPage.is, ataquepokemonPage);