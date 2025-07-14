import {html, PolymerElement} from 'https://unpkg.com/@polymer/polymer@3.5.0/polymer-element.js';
import './task-item.js'; // Importamos el componente que representa una sola tarea

class TaskList extends PolymerElement {

  // Definimos las propiedades del componente
  static get properties() {
    return {
      tasks: {
        type: Array,
        value: () => JSON.parse(localStorage.getItem('task') || '[]') // Cargamos desde localStorage
      }
    };
  }

  // Definimos la estructura visual del componente
  static get template() {
    return html`
      <style>
        #taskList {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }
      </style>

      <!-- Aquí se insertarán dinámicamente los task-item -->
      <div id="taskList"></div>
    `;
  }

  // Renderiza cada tarea como <task-item>
  _renderList() {
    const container = this.shadowRoot.getElementById('taskList');
    container.innerHTML = ''; // Limpiamos contenido anterior

    this.tasks.forEach(task => {
      const item = document.createElement('task-item');
      item.task = task; // Le pasamos la tarea como propiedad

      // Escuchamos los eventos de completar o eliminar
      item.addEventListener('toggle-task', e => this.toggleTask(e));
      item.addEventListener('delete-task', e => this.deleteTask(e));

      container.appendChild(item); // Lo agregamos al DOM
    });
  }

  // Alterna el estado 'done' de la tarea y actualiza localStorage
  toggleTask(e) {
    const id = e.detail.id;
    this.tasks = this.tasks.map(t => {
      if (t.id === id) {
        const updated = { ...t, done: !t.done };
        console.log("🔁 Tarea completada/cancelada:", updated);
        return updated;
      }
      return t;
    });
    localStorage.setItem('task', JSON.stringify(this.tasks));
    this._renderList(); // Volvemos a mostrar las tareas
  }

  // Elimina la tarea con el ID recibido
  deleteTask(e) {
    const id = e.detail.id;
    const tarea = this.tasks.find(t => t.id === id);
    console.log("❌ Tarea eliminada:", tarea);

    this.tasks = this.tasks.filter(t => t.id !== id);
    localStorage.setItem('task', JSON.stringify(this.tasks));
    this._renderList();
  }

  // Se ejecuta cuando el componente se agrega al DOM
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('new-task', this._onNewTask.bind(this)); // Escuchamos nuevas tareas
    this._renderList(); // Mostramos tareas existentes
  }

  // Agrega la nueva tarea recibida por evento global
  _onNewTask(e) {
    this.push('tasks', e.detail); // Polymer actualiza el array
    localStorage.setItem('task', JSON.stringify(this.tasks));
    this._renderList();
  }
}

customElements.define('task-list', TaskList);