import {html, PolymerElement} from 'https://unpkg.com/@polymer/polymer@3.5.0/polymer-element.js';

class TaskItem extends PolymerElement {

  // Declaramos la propiedad task (recibida desde task-list)
  static get properties() {
    return {
      task: Object
    };
  }

  // Definimos el estilo y HTML del componente
  static get template() {
    return html`
      <style>
        .done {
          color: gray;
          text-decoration: line-through;
          pointer-events: none; /* Desactiva interacciones si está completada */
        }
        button {
          margin-left: 10px;
          padding: 5px;
        }
      </style>

      <!-- Mostramos el nombre y dos botones -->
      <div>
        <span class$="[[computeClass(task.done)]]">[[task.name]]</span>
        <button on-click="toggleDone">Completar</button>
        <button on-click="deleteTask">Eliminar</button>
      </div>
    `;
  }

  // Devuelve la clase CSS "done" si la tarea está completada
  computeClass(done) {
    return done ? 'done' : '';
  }

  // Emitimos evento al hacer clic en "Completar"
  toggleDone() {
    this.dispatchEvent(new CustomEvent('toggle-task', { detail: this.task }));
  }

  // Emitimos evento al hacer clic en "Eliminar"
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task }));
  }
}

customElements.define('task-item', TaskItem);