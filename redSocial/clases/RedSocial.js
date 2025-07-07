export class RedSocial {
    //almacena la url base de la API
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    //arrrays vacios donde se guardan los datos que se traen desde la PI
    this.posts = [];
    this.users = [];
    this.photos = [];
  }

  // Carga datos de la API de 3 endpoints: posts, users, photos
  async cargarDatos() {
    try {
      const [resPosts, resUsers, resPhotos] = await Promise.all([
       //trae los primeros 5 posts
        fetch(`${this.apiUrl}/posts?_limit=5`),
       //trae los usuarios 
        fetch(`${this.apiUrl}/users`),
        //trae 5 fotos desde la posicion 0
        fetch(`${this.apiUrl}/photos?_start=0&_limit=5`)
      ]);
      // se convierten a JSON y se almacenan en la clase

      this.posts = await resPosts.json();
      this.users = await resUsers.json();
      this.photos = await resPhotos.json();
//este muestra error en consola por si falla algo
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
    }
  }

  //Muestra los posts en el contenedor
  renderizarPosts(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = '';
//se recorre cada post 
    this.posts.forEach(({ title, body, userId }, index) => {
      const user = this.users.find(u => u.id === userId);
      const nombre = user?.name || 'Anónimo';

      //Imagen por post (cargada desde la API de photos)
      const imagen = `https://picsum.photos/600/300?random=${index}`;
     // const imagen = this.photos[index]?.url || 'https://via.placeholder.com/600x300?text=Sin+Imagen';

     //construccion de html
      const postHTML = `
        <div class="post">
          <h3>${title}</h3>
          <p>${body}</p>
          <p><strong>Autor:</strong> ${nombre}</p>
          <img src="${imagen}" alt="Imagen del post" />
        </div>
        85467
        <button class="like-btn"> me gusta
        <button class="like-btn"> comentar
        <button class="like-btn"> compartir
      `;
//agrega cada posthtml al contenedor 
      contenedor.innerHTML += postHTML;
    });
  }
}