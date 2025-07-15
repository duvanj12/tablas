export const translations = {
  es: {
    origin: "Origen",
    status: "Estado",
    any: "Cualquiera",
    alive: "Vivo",
    dead: "Muerto",
    submit: "Buscar",

    // NUEVAS TRADUCCIONES PARA LA TARJETA
    name: "Nombre",
    species: "Especie",
    gender: "Género",
    originDimension: "Dimensión del Origen",
    location: "Ubicación",
    locationDimension: "Dimensión de Ubicación"
  },
  en: {
    origin: "Origin",
    status: "Status",
    any: "Any",
    alive: "Alive",
    dead: "Dead",
    submit: "Search",

    // TARJETA
    name: "Name",
    species: "Species",
    gender: "Gender",
    originDimension: "Origin Dim.",
    location: "Location",
    locationDimension: "Location Dim."
  }
};

export let currentLang = "es";

export function setLang(lang) {
  currentLang = lang;
  window.dispatchEvent(new CustomEvent("lang-changed"));
}

export function t(key) {
  return translations[currentLang][key] || key;
}