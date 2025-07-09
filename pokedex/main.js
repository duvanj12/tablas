// Importación de los Web Components
import './components/PokemonItem.js';
import './components/PokemonDetail.js';

// Referencias a elementos del DOM
const listaContainer = document.getElementById('lista-pokemones');
const detalleContainer = document.getElementById('detalle-pokemon');
const btnTodos = document.getElementById('btnTodos');
const btnFavoritos = document.getElementById('btnFavoritos');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const paginaActual = document.getElementById('pagina-actual');

// Estado principal
let todosLosPokemones = [];
let pagina = 1;
const porPagina = 10;
let mostrandoFavoritos = false;

// Carga y mapea los 150 pokémon con datos útiles
const cargarPokemones = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await res.json();

  const pokemones = await Promise.all(
    data.results.map(async (poke) => {
      const resDetalle = await fetch(poke.url);
      const d = await resDetalle.json();
      return {
        id: d.id,
        name: d.name,
        img: d.sprites.front_default,
        types: d.types.map(t => t.type.name)
      };
    })
  );

  todosLosPokemones = pokemones;
  renderPagina();
};

// Muestra la lista de Pokémon en la página actual
const renderPagina = () => {
  listaContainer.innerHTML = '';
  const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

  const filtrados = mostrandoFavoritos
    ? todosLosPokemones.filter(p => favoritos.includes(p.id))
    : todosLosPokemones;

  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const paginaActualPokemones = filtrados.slice(inicio, fin);

  paginaActualPokemones.forEach(poke => {
    const item = document.createElement('pokemon-item');
    item.setAttribute('data', JSON.stringify(poke));
    listaContainer.appendChild(item);
  });

  paginaActual.textContent = pagina;
};

// Escucha los eventos emitidos desde los Web Components
listaContainer.addEventListener('seleccionar-pokemon', (e) => {
  const detalle = document.createElement('pokemon-detail');
  detalle.setAttribute('id', e.detail.id);
  detalleContainer.innerHTML = '';
  detalleContainer.appendChild(detalle);
});

// Navegación entre páginas
btnAnterior.addEventListener('click', () => {
  if (pagina > 1) {
    pagina--;
    renderPagina();
  }
});

btnSiguiente.addEventListener('click', () => {
  const total = mostrandoFavoritos
    ? JSON.parse(localStorage.getItem('favoritos') || '[]').length
    : todosLosPokemones.length;

  if (pagina < Math.ceil(total / porPagina)) {
    pagina++;
    renderPagina();
  }
});

// Filtro entre todos y favoritos
btnTodos.addEventListener('click', () => {
  mostrandoFavoritos = false;
  pagina = 1;
  renderPagina();
  btnTodos.classList.add('activo');
  btnFavoritos.classList.remove('activo');
});

btnFavoritos.addEventListener('click', () => {
  mostrandoFavoritos = true;
  pagina = 1;
  renderPagina();
  btnTodos.classList.remove('activo');
  btnFavoritos.classList.add('activo');
});

// Iniciar carga
cargarPokemones();
