export class PokemonDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const id = this.getAttribute('id');
    if (!id) return;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const tipoPrincipal = data.types[0].type.name;
    const colorTipo = this.obtenerColorTipo(tipoPrincipal);

    // Renderizamos la tarjeta con estilos personalizados según el tipo
    this.shadowRoot.innerHTML = `
      <style>
        .tarjeta {
          background: ${colorTipo};
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          transition: transform 0.4s ease, filter 0.3s;
          width: 100%;
          max-width: 380px;
          margin: auto;
          backdrop-filter: blur(5px);
          clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
          color: white;
        }

        .tarjeta:hover {
          transform: scale(1.05) rotate(1deg);
          filter: brightness(1.1);
        }

        .cabecera {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
        }

        .nombre {
          font-size: 1.4rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .estrella {
          font-size: 24px;
          color: #ccc;
          cursor: pointer;
        }

        .favorito-activo {
          color: #ffeb3b;
          text-shadow: 0 0 10px #ffeb3b;
        }

        .imagenes {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 1rem;
        }

        .imagenes img {
          width: 100px;
          height: auto;
          border-radius: 12px;
          border: 2px solid #fff;
          background-color: #222;
          transition: transform 0.3s;
        }

        .imagenes img:hover {
          transform: scale(1.05);
        }

        .tabla-estadisticas table {
          width: 100%;
          background-color: rgba(0,0,0,0.3);
          border-collapse: collapse;
          margin: 1rem 0;
          border-radius: 8px;
          overflow: hidden;
          font-size: 0.85rem; /* Tamaño reducido */
        }

        .tabla-estadisticas th,
        .tabla-estadisticas td {
          padding: 0.5rem;
          text-align: center;
          border-bottom: 1px solid #444;
        }

        .tabla-estadisticas th {
          background-color: #4fc3f7;
          color: #1e1e2f;
        }

        p {
          padding: 0 1rem;
          font-size: 0.95rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
          text-align: center;
        }

        li {
          text-transform: capitalize;
          font-weight: bold;
          margin: 5px 0;
        }

        .tipo-label {
          display: inline-block;
          margin: 4px;
          padding: 4px 10px;
          border-radius: 10px;
          color: #fff;
          font-weight: bold;
          text-transform: capitalize;
        }
      </style>

      <div class="tarjeta">
        <div class="cabecera">
          <span class="nombre">${data.name}</span>
          <span class="estrella favorito-activo">★</span>
        </div>

        <div class="imagenes">
          <img src="${data.sprites.front_default}" alt="Frente" />
          <img src="${data.sprites.back_default}" alt="Espalda" />
          <img src="${data.sprites.front_shiny}" alt="Shiny" />
        </div>

        <p>
          ${data.types.map(t => `
            <span class="tipo-label" style="background:${this.obtenerColorTipo(t.type.name)}">
              ${t.type.name}
            </span>
          `).join('')}
        </p>

        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Experiencia:</strong> ${data.base_experience}</p>

        <div class="tabla-estadisticas">
          <table>
            <thead>
              <tr><th>Estadística</th><th>Valor</th></tr>
            </thead>
            <tbody>
              <tr><td>Salud</td><td>${data.stats[0].base_stat}</td></tr>
              <tr><td>Ataque</td><td>${data.stats[1].base_stat}</td></tr>
              <tr><td>Defensa</td><td>${data.stats[2].base_stat}</td></tr>
              <tr><td>Velocidad</td><td>${data.stats[5].base_stat}</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Habilidades:</strong></p>
        <ul>
          ${data.abilities.map(hab => `<li>${hab.ability.name}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Devuelve el color correspondiente al tipo del Pokémon
  obtenerColorTipo(tipo) {
    const colores = {
      fire: '#f08030', water: '#6890f0', grass: '#78c850', electric: '#f8d030',
      ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0', ground: '#e0c068',
      flying: '#a890f0', psychic: '#f85888', bug: '#a8b820', rock: '#b8a038',
      ghost: '#705898', dragon: '#7038f8', dark: '#705848', steel: '#b8b8d0',
      fairy: '#ee99ac', normal: '#a8a878'
    };
    return colores[tipo] || '#444';
  }

  static get observedAttributes() {
    return ['id'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'id' && oldVal !== newVal) {
      this.connectedCallback();
    }
  }
}

customElements.define('pokemon-detail', PokemonDetail);
