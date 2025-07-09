// Web Component para representar un Pokémon en la lista
export class PokemonItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const data = JSON.parse(this.getAttribute('data'));
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const esFavorito = favoritos.includes(data.id);

    // Renderiza el contenido interno del componente
    this.shadowRoot.innerHTML = `
      <style>
        .item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: 1px solid #444;
          border-radius: 10px;
          background: #30304a;
          cursor: pointer;
          transition: background 0.2s;
        }

        .item:hover {
          background-color: #3a3a5a;
        }

        img {
          width: 60px;
          height: 60px;
          border: 2px solid #fff;
          border-radius: 8px;
          background: #fff;
        }

        .info {
          flex: 1;
        }

        .nombre {
          font-weight: bold;
          color: #fff;
          text-transform: capitalize;
        }

        .tipo {
          font-size: 0.9em;
          color: #ccc;
          text-transform: capitalize;
        }

        .estrella {
          background: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png') no-repeat center;
          background-size: cover;
          width: 24px;
          height: 24px;
          border: none;
          filter: grayscale(100%);
          transition: transform 0.2s ease;
        }

        .favorito {
          filter: none;
          transform: scale(1.2);
        }
      </style>

      <div class="item">
        <img src="${data.img}" alt="${data.name}" />
        <div class="info">
          <div class="nombre">${data.name}</div>
          <div class="tipo">${data.types.join(', ')}</div>
        </div>
        <button class="estrella ${esFavorito ? 'favorito' : ''}"></button>
      </div>
    `;

    // funcion al hacer clic en la tarjeta (excepto botón): mostrar detalle
    this.shadowRoot.querySelector('.item').addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        this.dispatchEvent(new CustomEvent('seleccionar-pokemon', {
          detail: { id: data.id },
          bubbles: true,
          composed: true
        }));
      }
    });

    // funcion para marcar o desmarcar como favorito
    this.shadowRoot.querySelector('.estrella').addEventListener('click', (e) => {
      e.stopPropagation();
      this.marcarFavorito(data.id);
    });
  }

  // Agrega o quita el Pokémon de favoritos y vuelve a renderizar
  marcarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const index = favoritos.indexOf(id);
    if (index >= 0) favoritos.splice(index, 1);
    else favoritos.push(id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.connectedCallback(); // Re-renderiza el componente
  }
}

customElements.define('pokemon-item', PokemonItem);
