import { LitElement, html, css } from 'lit';
import { t, currentLang } from '../i18n.js';

// Componente visual para mostrar una tarjeta de personaje
export class RmCharacter extends LitElement {
  static properties = {
    character: { type: Object }, // Datos del personaje
    lang: { type: String } // Idioma actual para re-render
  };

  // Estilos visuales con efecto neón 3D
  static styles = css`
    .card {
      background: #111;
      color: #fff;
      border-radius: 20px;
      box-shadow: 0 0 12px #00ff80, 0 0 4px #00ff80 inset;
      padding: 16px;
      max-width: 280px;
      font-family: 'Segoe UI', sans-serif;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 0 24px #00ff80, 0 0 6px #00ff80 inset;
    }

    img {
      width: 100%;
      border-radius: 12px;
      margin-bottom: 12px;
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 1.3em;
      color: #90caf9;
    }

    p {
      margin: 4px 0;
      font-size: 0.95em;
      line-height: 1.4;
    }

    .label {
      font-weight: bold;
      color: #64b5f6;
    }
  `;

  constructor() {
    super();
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

  // Cuando cambia el idioma, actualizamos la tarjeta
  _onLangChanged = () => {
    this.lang = currentLang;
    this.requestUpdate();
  };

  render() {
    const c = this.character;
    return html`
      <div class="card">
        <img src=${c.image} alt=${c.name} />
        <h3>${c.name}</h3>
        <p><span class="label">${t('status')}:</span> ${c.status}</p>
        <p><span class="label">${t('species')}:</span> ${c.species}</p>
        <p><span class="label">${t('gender')}:</span> ${c.gender}</p>
        <p><span class="label">${t('origin')}:</span> ${c.origin.name}</p>
        <p><span class="label">${t('originDimension')}:</span> ${c.originDimension}</p>
        <p><span class="label">${t('location')}:</span> ${c.location.name}</p>
        <p><span class="label">${t('locationDimension')}:</span> ${c.locationDimension}</p>
      </div>
    `;
  }
}

customElements.define('rm-character', RmCharacter);