import { LitElement, html, css } from 'lit';
import { currentLang, setLang } from '../i18n.js';

// Componente para cambiar el idioma global del sitio
export class LangSwitch extends LitElement {
  static properties = {
    lang: { type: String }, // propiedad reactiva para manejar el idioma
  };

  // Estilos para el botón de idioma
  static styles = css`
    button {
      background: linear-gradient(to right, #2196f3, #21cbf3);
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: background 0.3s ease;
    }

    button:hover {
      background: linear-gradient(to right, #1e88e5, #1de9b6);
    }
  `;

  constructor() {
    super();
    this.lang = currentLang; // idioma actual al cargar
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('lang-changed', this._onLangChanged); // escuchamos cambio de idioma global
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('lang-changed', this._onLangChanged);
  }

  // Cambia idioma localmente al recibir evento
  _onLangChanged = () => {
    this.lang = currentLang;
    this.requestUpdate();
  };

  // Alterna entre español e inglés
  toggleLang() {
    const next = this.lang === 'es' ? 'en' : 'es';
    setLang(next);
  }

  render() {
    return html`
      <button @click=${this.toggleLang}>
         ${this.lang === 'es' ? 'English' : 'Español'}
      </button>
    `;
  }
}

customElements.define('lang-switch', LangSwitch);