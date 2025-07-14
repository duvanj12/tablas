// Importamos PolymerElement y html desde CDN (no se necesita instalar nada)
import {html, PolymerElement} from 'https://unpkg.com/@polymer/polymer@3.5.0/polymer-element.js';

// Declaramos el componente <task-new>
class TaskNew extends PolymerElement {

  // Definimos la plantilla HTML del componente
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin-bottom: 10px;
        }
        input {
          padding: 5px;
        }
        button {
          margin-left: 10px;
          padding: 5px 10px;
        }
      </style>

      <!-- Campo para escribir el nombre de la nueva tarea -->
      <input id="taskInput" placeholder="Nueva tarea...">

      <!-- Botón que dispara el método addTask -->
      <button on-click="addTask">Agregar</button>
    `;
  }

  // Este método se ejecuta al hacer clic en "Agregar"
  addTask() {
    const input = this.$.taskInput;       // Referencia al input
    const name = input.value.trim();      // Limpiamos espacios en blanco

    if (!name) return;                    // Si el nombre está vacío, no hace nada

    // Creamos una nueva tarea con ID único, nombre y estado "no completada"
    const newTask = {
      id: Date.now(),
      name: name,
      done: false
    };

    console.log("🟢 Tarea agregada:", newTask); // Mostramos en consola

    // Disparamos un evento personalizado global llamado 'new-task'
    window.dispatchEvent(new CustomEvent('new-task', { detail: newTask }));

    // Limpiamos el input después de agregar
    input.value = '';
  }
}

// Registramos el componente como <task-new>
customElements.define('task-new', TaskNew);