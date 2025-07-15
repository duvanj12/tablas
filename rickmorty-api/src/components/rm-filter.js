import { LitElement, html, css } from 'lit';
import { t, currentLang } from '../i18n.js';
import { DataManager } from '../data-manager.js';

import './rm-character.js';
import './lang-switch.js';

import '@material/web/textfield/filled-text-field.js';
import '@material/web/select/filled-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';

export class RmFilter extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    md-filled-text-field, md-filled-select, md-filled-button {
      margin: 8px;
      width: 250px;
    }
    #characters {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    lang-switch {
      margin-left: auto;
    }
  `;

  constructor() {
    super();
    this.dm = new DataManager();
    this.origin = '';
    this.status = '';
    this.characters = [];
    this.lang = currentLang;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("lang-changed", this._onLangChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("lang-changed", this._onLangChanged);
  }

  _onLangChanged = () => {
    this.lang = currentLang;
    this.requestUpdate();
  };

  render() {
    return html`
      <lang-switch></lang-switch>
      <form @submit=${this._onSubmit}>
        <md-filled-text-field
          label=${t('origin')}
          .value=${this.origin}
          @input=${e => this.origin = e.target.value}>
        </md-filled-text-field>

        <md-filled-select
          label=${t('status')}
          @change=${e => this.status = e.target.value}>
          <md-select-option value="">
            <div slot="headline">${t('any')}</div>
          </md-select-option>
          <md-select-option value="alive">
            <div slot="headline">${t('alive')}</div>
          </md-select-option>
          <md-select-option value="dead">
            <div slot="headline">${t('dead')}</div>
          </md-select-option>
        </md-filled-select>

        <md-filled-button type="submit">
          ${t('submit')}
        </md-filled-button>
      </form>

      <div id="characters">
        ${this.characters.map(c => html`<rm-character .character=${c}></rm-character>`)}
      </div>
    `;
  }

  async _onSubmit(e) {
    e.preventDefault();
    this.characters = await this.dm.fetchCharacters({
      origin: this.origin,
      status: this.status,
    });
    this.requestUpdate();
  }
}

customElements.define('rm-filter', RmFilter);