import './components/rm-filter.js';
import './components/lang-switch.js';

// Cargar idiomas manualmente
const messages = {
  en: {
    filter: {
      origin: "Origin",
      status: "Status",
      any: "Any",
      alive: "Alive",
      dead: "Dead",
      submit: "Search"
    }
  },
  es: {
    filter: {
      origin: "Origen",
      status: "Estado",
      any: "Cualquiera",
      alive: "Vivo",
      dead: "Muerto",
      submit: "Buscar"
    }
  }
};

// Función para cambiar idioma
function setupI18n() {
  const lang = navigator.language.startsWith('es') ? 'es' : 'en';
  use(lang);
}

// Configura traducciones y arranca la app
setupI18n();
