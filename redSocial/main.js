//cargamos redsocial desde clases
import { RedSocial } from './clases/RedSocial.js';
//se crea la instacia de la url de la API
const app = new RedSocial('https://jsonplaceholder.typicode.com');
//definimos una funcion llama la app y espera ue cargen los 3 endpoins y dibuja en los div los post con autor contenido titulo y imagen 
const iniciar = async () => {
  await app.cargarDatos();
  app.renderizarPosts('posts-container');
};
//inicia despues de cargar esto 
iniciar();