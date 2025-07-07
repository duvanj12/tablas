//configuracion de base 
let vida_submarino = 2500;
let ataque_submarino = 500;

//configuracion de unidades
let unidadesConfig = {
  'Soldado Regular':     { vida: 2 / 12, ataque: 1 / 14, rango: [500, 1000] },
  'Soldado Profesional': { vida: 3 / 12, ataque: 2 / 14, rango: [500, 1000] },
  'Soldado Elite':       { vida: 4 / 12, ataque: 3 / 14, rango: [200, 300] },
  'Tanque':              { vida: 7 / 12, ataque: 4 / 14, rango: [50, 100] },
  'Helicóptero':         { vida: 8 / 12, ataque: 5 / 14, rango: [30, 50] },
  'Avion':               { vida: 10 / 12, ataque: 6 / 14, rango: [50, 75] },
  'Submarino':           { vida: 1, ataque: 1, rango: [1, 2] }
};

//formulario de configuracion de unidades
function renderFormConfigTropas() {
  const contenedor = document.getElementById('configTropas');
  contenedor.innerHTML = '';
  for (const tipo in unidadesConfig) {
    const img = getImagenUnidad(tipo);
    contenedor.innerHTML += `
      <div style="margin-bottom: 10px; text-align: left;">
        <img src="img/${img}" class="img-unidad" />
        <strong>${tipo}</strong><br />
        Vida: <input type="number" step="0.01" id="vida-${tipo}" value="${(unidadesConfig[tipo].vida).toFixed(2)}" style="width: 60px" />
        Ataque: <input type="number" step="0.01" id="ataque-${tipo}" value="${(unidadesConfig[tipo].ataque).toFixed(2)}" style="width: 60px" />
      </div>
    `;
  }
}

//funcion para configrar vida y ataque de submarino
function guardarSubmarino() {
  vida_submarino = parseInt(document.getElementById('vidaSubmarino').value);
  ataque_submarino = parseInt(document.getElementById('ataqueSubmarino').value);
  alert("Submarino actualizado");
  console.log("Nueva vida del submarino:", vida_submarino);
  console.log("Nuevo ataque del submarino:", ataque_submarino);
}

//donde guarda la configuracion de vida y ataque de las tropas
function guardarTropas() {
  for (const tipo in unidadesConfig) {
    unidadesConfig[tipo].vida = parseFloat(document.getElementById(`vida-${tipo}`).value);
    unidadesConfig[tipo].ataque = parseFloat(document.getElementById(`ataque-${tipo}`).value);
  }
  alert("Tropas actualizadas");
  console.log("Nuevas proporciones de vida y ataque:", unidadesConfig);
}

//ramdon para numeros aleatorios clima
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reducirPorClima(valor) {
  const porcentaje = Math.random() * 0.3;
  return Math.floor(valor * (1 - porcentaje));
}

//variable global para guardar ejercitos y estadisticas
let ejercitoAzul = [], ejercitoRojo = [], stats, ganadorFinal;

//funcion para crear ejercitos
function crearEjercitos() {
  stats = {
    criticos: 0,
    ataquesEfectivos: 0,
    totalAtaques: 0,
    eliminadas: { Azul: {}, Rojo: {} },
    perdidas: { Azul: {}, Rojo: {} }
  };

  //Desactiva botón de "Nueva Guerra" y lo pinta gris
  const btn = document.getElementById("btnNuevaGuerra");
  btn.disabled = true;
  btn.style.backgroundColor = 'gray';

  const azul = crearEjercito();
  const rojo = crearEjercito();
  ejercitoAzul = azul.ejercito;
  ejercitoRojo = rojo.ejercito;

  // muestra la tabla de unidades creadas con su bandera
  document.getElementById('infoEjercitos').innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <img src="img/bandera1.png" style="height:30px;" />
      <h4>Ejército Azul:</h4>
    </div>
    ${generarTablaHTML(azul.creados)}
    <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
      <img src="img/bandera2.jpg" style="height:30px;" />
      <h4>Ejército Rojo:</h4>
    </div>
    ${generarTablaHTML(rojo.creados)}
  `;

  console.log("Ejército Azul generado:", azul.creados);
  console.log("Ejército Rojo generado:", rojo.creados);
  logHTML("Ejércitos creados");
}

//funcion que genera unidades del ejercito
function crearEjercito() {
  const ejercito = [], creados = {};
  for (const tipo in unidadesConfig) {
    const { vida, ataque, rango } = unidadesConfig[tipo];
    const cantidad = getRandom(rango[0], rango[1]);
    creados[tipo] = cantidad;
    for (let i = 0; i < cantidad; i++) {
      ejercito.push({
        nombre: tipo,
        vidaMax: vida * vida_submarino,
        vida: vida * vida_submarino,
        ataqueMax: ataque * ataque_submarino
      });
    }
  }
  return { ejercito, creados };
}

//simulacion de la guerra por turnos ramdon de quien inicia
async function pelear() {
  let turno = 1;
  let turnoActual = Math.random() < 0.5 ? 'Azul' : 'Rojo';

  console.log("Inicio de batalla. Ataca primero:", turnoActual);

  while (contarVivos(ejercitoAzul) > 0 && contarVivos(ejercitoRojo) > 0) {
    logHTML(`🔁 Turno ${turno}: Ataca ${turnoActual}`);

    if (turnoActual === 'Azul') {
      procesarTurno(ejercitoAzul, ejercitoRojo, 'Azul', 'Rojo');
    } else {
      procesarTurno(ejercitoRojo, ejercitoAzul, 'Rojo', 'Azul');
    }

    actualizarVisualEjercitos();
    turnoActual = (turnoActual === 'Azul') ? 'Rojo' : 'Azul';
    //agregar 2 segundos entre ataque y respuesta
    await new Promise(r => setTimeout(r, 2000));
    turno++;
  }

  ganadorFinal = contarVivos(ejercitoAzul) > 0 ? 'Azul' : 'Rojo';
  logHTML(`Ganador: ${ganadorFinal}`);
  mostrarEstadisticasFinales();
//boton nueva guerra 
  const btn = document.getElementById("btnNuevaGuerra");
  btn.disabled = false;
  btn.style.backgroundColor = ''; //restaura color original
  console.log("Ganador:", ganadorFinal);
}

//funcion de ataque en cada turno
function procesarTurno(atacantes, defensores, atacanteColor, defensorColor) {
  const antes = contarPorTipo(defensores);
  atacar(atacantes, defensores, atacanteColor);
  const despues = contarPorTipo(defensores);
  const perdidas = calcularDiferencia(antes, despues);
  if (Object.keys(perdidas).length > 0) {
    logHTML(`Muertos ${defensorColor} este turno:`);
    logHTML(perdidas, 'tabla');
  } else {
    logHTML(`${defensorColor} no tuvo bajas`);
  }
}

//funcion de ataque ramdon a unidades vivas
function atacar(atacantes, defensores, color) {
  const vivosA = atacantes.filter(u => u.vida > 0);
  const vivosD = defensores.filter(u => u.vida > 0);

  vivosA.forEach(() => {
    const a = vivosA[Math.floor(Math.random() * vivosA.length)];
    const d = vivosD[Math.floor(Math.random() * vivosD.length)];
    if (!a || !d || d.vida <= 0) return;

    const base = getRandom(1, a.ataqueMax);
    const real = reducirPorClima(base);
    d.vida -= real;

    stats.totalAtaques++;
    if (real > 0) stats.ataquesEfectivos++;
    if (base === a.ataqueMax) stats.criticos++;
    if (d.vida <= 0) {
      stats.eliminadas[color][d.nombre] = (stats.eliminadas[color][d.nombre] || 0) + 1;
    }
  });
}

//funciones para ir mostrando resultados de la guerra
function actualizarVisualEjercitos() {
  const vivosAzul = contarPorTipo(ejercitoAzul);
  const vivosRojo = contarPorTipo(ejercitoRojo);

  document.getElementById('infoEjercitos').innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <img src="img/bandera1.png" style="height:30px;" />
      <h4>Ejército Azul:</h4>
    </div>
    ${generarTablaHTML(vivosAzul)}
    <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
      <img src="img/bandera2.jpg" style="height:30px;" />
      <h4>Ejército Rojo:</h4>
    </div>
    ${generarTablaHTML(vivosRojo)}
  `;
}

//conteo por tiipo
function contarVivos(ejercito) {
  return ejercito.filter(u => u.vida > 0).length;
}

function contarPorTipo(ejercito) {
  const resultado = {};
  ejercito.forEach(u => {
    if (u.vida > 0) resultado[u.nombre] = (resultado[u.nombre] || 0) + 1;
  });
  return resultado;
}

function calcularDiferencia(antes, despues) {
  const perdidas = {};
  for (const tipo in antes) {
    const diff = (antes[tipo] || 0) - (despues[tipo] || 0);
    if (diff > 0) perdidas[tipo] = diff;
  }
  return perdidas;
}

// se muestra en el log 
function logHTML(mensaje, tipo = 'texto') {
  const log = document.getElementById('logBatalla');
  const p = document.createElement(tipo === 'tabla' ? 'div' : 'p');
  if (tipo === 'tabla') {
    const tabla = generarTablaDesdeObjeto(mensaje);
    p.appendChild(tabla);
  } else {
    p.textContent = mensaje;
  }
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
  console.log(mensaje);
}

// tablas y img
function generarTablaHTML(obj) {
  let html = `<table>`;
  for (const tipo in obj) {
    const img = getImagenUnidad(tipo);
    html += `
      <tr>
        <td><img src="img/${img}" alt="${tipo}" style="width: 30px;" /></td>
        <td>${tipo}</td>
        <td>${obj[tipo]}</td>
      </tr>`;
  }
  html += `</table>`;
  return html;
}

function generarTablaDesdeObjeto(obj) {
  const tabla = document.createElement('table');
  for (const clave in obj) {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${clave}</td><td>${obj[clave]}</td>`;
    tabla.appendChild(fila);
  }
  return tabla;
}

function getImagenUnidad(nombre) {
  const map = {
    'Soldado Regular': 'soldado1.png',
    'Soldado Profesional': 'soldado2.png',
    'Soldado Elite': 'soldado3.jpg',
    'Tanque': 'tanque.png',
    'Helicóptero': 'helicoptero.png',
    'Avion': 'avion.webp',
    'Submarino': 'submarino.jpg'
  };
  return map[nombre] || 'soldado1.png';
}

// mostramos estadisticas finales
function mostrarEstadisticasFinales() {
  const heridosAzul = contarHeridos(ejercitoAzul);
  const heridosRojo = contarHeridos(ejercitoRojo);

  const estadisticas = document.getElementById('estadisticasFinales');
  estadisticas.innerHTML = `
    <h4> Estadísticas Finales</h4>
    <h4> Ganador: ${ganadorFinal}</h4>
    <p> Ataques efectivos: ${stats.ataquesEfectivos}</p>
    <p> Golpes críticos: ${stats.criticos}</p>
    <p> Total de ataques que quitaron vida: ${stats.totalAtaques}</p>
    <h5> Eliminados por Azul:</h5>
    ${generarTablaHTML(stats.eliminadas['Azul'])}
    <h5> Eliminados por Rojo:</h5>
    ${generarTablaHTML(stats.eliminadas['Rojo'])}
    <h5> Unidades al médico/taller Azul (vida < 30%):</h5>
    ${generarTablaHTML(heridosAzul)}
    <h5> Unidades al médico/taller Rojo (vida < 30%):</h5>
    ${generarTablaHTML(heridosRojo)}
  `;
}

//funcion para ver las unidades con vida menor a 30%
function contarHeridos(ejercito) {
  const resultado = {};
  ejercito.forEach(u => {
    if (u.vida > 0 && u.vida < u.vidaMax * 0.3) {
      resultado[u.nombre] = (resultado[u.nombre] || 0) + 1;
    }
  });
  return resultado;
}

//se usa para renderizar formulario de configuracion al iniciar la pagina
document.addEventListener("DOMContentLoaded", renderFormConfigTropas);
