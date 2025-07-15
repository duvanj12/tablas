// clase para manejar todas las peticiones al API Rick and Morty
export class DataManager {
  constructor() {
    this.apiURL = 'https://rickandmortyapi.com/api'; // URL base del API
  }

  /**
   * Método principal para obtener personajes con filtros aplicados.
   * @param {Object} filters - Filtros {origin, status}
   */
  async fetchCharacters(filters = {}) {
    const params = new URLSearchParams();

    // Si el usuario escribió un origen, se incluye como nombre
    if (filters.origin) {
      params.set('name', filters.origin);
    }

    // Si se seleccionó un estado (alive o dead)
    if (filters.status) {
      params.set('status', filters.status);
    }

    try {
      const res = await fetch(`${this.apiURL}/character/?${params}`);
      const data = await res.json();

      if (!data.results) return [];

      // Para cada personaje obtenemos su dimensión del origen y ubicación
      const enriched = await Promise.all(
        data.results.map(async (char) => {
          const originDim = await this._getDimension(char.origin.url);
          const locationDim = await this._getDimension(char.location.url);
          return {
            ...char,
            originDimension: originDim,
            locationDimension: locationDim,
          };
        })
      );

      return enriched;
    } catch (error) {
      console.error('❌ Error fetching characters:', error);
      return [];
    }
  }

  /**
   * Dado un URL, retorna la dimensión del lugar (si aplica)
   * @param {string} url - URL del endpoint (origen o ubicación)
   * @returns {string} dimensión o 'unknown'
   */
  async _getDimension(url) {
    if (!url) return 'unknown';

    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.dimension || 'unknown';
    } catch {
      return 'unknown';
    }
  }
}