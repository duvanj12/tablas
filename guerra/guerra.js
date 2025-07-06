// Vida y ataque base del submarino
const vida_submarino = 2500;
const ataque_submarino = 500;
// configuracion de las inidades 

const unidadesConfig = {
  'Soldado Regular': { rango: [500, 1000], vida: 2 / 12, ataque: 1 / 14 },
  'Soldado Profesional': { rango: [500, 1000], vida: 3 / 12, ataque: 2 / 14 },
  'Soldado Elite': { rango: [200, 300], vida: 4 / 12, ataque: 3 / 14 },
  'Tanque': { rango: [50, 100], vida: 7 / 12, ataque: 4 / 14 },
  'Helicóptero': { rango: [30, 50], vida: 8 / 12, ataque: 5 / 14 },
  'Avion': { rango: [50, 75], vida: 10 / 12, ataque: 6 / 14 },
  'Submarino': { rango: [1, 2], vida: 1, ataque: 1 } 
};


// Retorna un número entero aleatorio entre min y max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ramdon para de afectacion por el clima
function reducirPorClima(valor) {
  const porcentaje = Math.random() * 0.3; // 0% a 30%
  return Math.floor(valor * (1 - porcentaje));
}

// se crean los ejercitos

function crearEjercito() {
  const ejercito = [];
  // Para registrar cuántas unidades se crean por tipo
  const creados = {}; 

  for (const tipo in unidadesConfig) {
    const config = unidadesConfig[tipo];
    // ramdon para Unidades aleatorias dentro del rango
    const cantidad = getRandom(...config.rango); 
    creados[tipo] = cantidad;

    for (let i = 0; i < cantidad; i++) {
      ejercito.push({
        nombre: tipo,
        vidaMax: config.vida * vida_submarino,
        vida: config.vida * vida_submarino,
        ataqueMax: config.ataque * ataque_submarino
      });
    }
  }

  return { ejercito, creados };
}

// contador de unidades vivas
function contarVivos(ejercito) {
  return ejercito.filter(u => u.vida > 0).length;
}

//se crea un contenedor para guardar las estadisticas

const stats = {
  criticos: 0,
  ataquesEfectivos: 0,
  totalAtaques: 0,
  eliminadas: { Azul: {}, Rojo: {} },
  perdidas: { Azul: {}, Rojo: {} }
};


// creamos la condicion para la guerra y añadimos el ataque aleatorio faltante 

function atacarAleatorio(atacantes, defensores, colorAtacante) {
  const atacantesVivos = atacantes.filter(a => a.vida > 0);
  const defensoresVivos = defensores.filter(d => d.vida > 0);

  if (atacantesVivos.length === 0 || defensoresVivos.length === 0) return;
//implementamos el forEach para el ramdom
  atacantesVivos.forEach(() => {
    const atacante = atacantesVivos[Math.floor(Math.random() * atacantesVivos.length)];
    const defensor = defensoresVivos[Math.floor(Math.random() * defensoresVivos.length)];

    if (!atacante || !defensor || defensor.vida <= 0 || atacante.vida <= 0) return;
// Daño base
    const base = getRandom(1, atacante.ataqueMax);
    // Se le aplica reducción por clima
    const real = reducirPorClima(base); 
// y este daño se le descuenta de la vida
    defensor.vida -= real; 

    // enviamos el registro a el contenedor de estadisticas
    stats.totalAtaques++;
    if (real > 0) stats.ataquesEfectivos++;
    if (base === atacante.ataqueMax) stats.criticos++;

    // y Si la unidad muere, se envia a registro
    if (defensor.vida <= 0) {
      const tipo = defensor.nombre;
      stats.eliminadas[colorAtacante][tipo] = (stats.eliminadas[colorAtacante][tipo] || 0) + 1;
    }
  });
}

// Muestra de qué turno se trata y quién inicia
function mostrarResumenTurno(turno, turnoInicial) {
  console.log(`\n Turno ${turno}: Ataca primero el ejército ${turnoInicial}`);
}

// Cuenta unidades vivas por tipo
function contarVivasPorTipo(ejercito) {
  const conteo = {};
  ejercito.forEach(u => {
    if (u.vida > 0) {
      conteo[u.nombre] = (conteo[u.nombre] || 0) + 1;
    }
  });
  return conteo;
}

// Muestra las bajas que sufrió un ejército en un turno
function mostrarPerdidasTurno(antes, despues, color) {
  const perdidas = {};
  for (const tipo in antes) {
    const diferencia = (antes[tipo] || 0) - (despues[tipo] || 0);
    if (diferencia > 0) {
      perdidas[tipo] = diferencia;
    }
  }

  if (Object.keys(perdidas).length > 0) {
    console.log(`muertes ${color} este turno:`);
    console.table(perdidas);
  } else {
    console.log(`El ejército ${color} no sufrió bajas este turno.`);
  }
}

// Muestra un resumen final de unidades ilesas, heridas o perdidas
function mostrarEstadisticas(ejercito, color) {
  let ilesos = 0;
  let heridos = 0;
  stats.perdidas[color] = {};

  ejercito.forEach(u => {
    const tipo = u.nombre;
    if (u.vida <= 0) {
      stats.perdidas[color][tipo] = (stats.perdidas[color][tipo] || 0) + 1;
    } else if (u.vida < u.vidaMax * 0.3) {
      heridos++;
    } else {
      ilesos++;
    }
  });

  console.log(`Estadísticas del ejército ${color}:`);
  console.log('Unidades perdidas:', stats.perdidas[color]);
  console.log('Unidades ilesas:', ilesos);
  console.log('Unidades muy dañadas (menos del 30% de vida):', heridos);
}


// se inicia la simulacion de la guerra 


const { ejercito: ejercito_Azul, creados: creadosAzul } = crearEjercito();
const { ejercito: ejercito_Rojo, creados: creadosRojo } = crearEjercito();

console.log("Ejércitos creados:");
console.log("Ejército Azul:", creadosAzul);
console.log("Ejército Rojo:", creadosRojo);

// Inicialización del turno
let turno = 1;
let turnoInicial = Math.random() < 0.5 ? 'Azul' : 'Rojo'; // ramdon

console.groupCollapsed("comienza la guerra!");
console.log(`El ejército ${turnoInicial} ataca primero`);

// Bucle de guerra hasta que uno de los dos ejércitos se quede sin unidades
while (contarVivos(ejercito_Azul) > 0 && contarVivos(ejercito_Rojo) > 0) {
  mostrarResumenTurno(turno, turnoInicial);

  if (turnoInicial === 'Azul') {
    const antesRojo = contarVivasPorTipo(ejercito_Rojo);
    atacarAleatorio(ejercito_Azul, ejercito_Rojo, 'Azul');
    const despuesRojo = contarVivasPorTipo(ejercito_Rojo);
    mostrarPerdidasTurno(antesRojo, despuesRojo, 'Rojo');

    const antesAzul = contarVivasPorTipo(ejercito_Azul);
    atacarAleatorio(ejercito_Rojo, ejercito_Azul, 'Rojo');
    const despuesAzul = contarVivasPorTipo(ejercito_Azul);
    mostrarPerdidasTurno(antesAzul, despuesAzul, 'Azul');
  } else {
    const antesAzul = contarVivasPorTipo(ejercito_Azul);
    atacarAleatorio(ejercito_Rojo, ejercito_Azul, 'Rojo');
    const despuesAzul = contarVivasPorTipo(ejercito_Azul);
    mostrarPerdidasTurno(antesAzul, despuesAzul, 'Azul');

    const antesRojo = contarVivasPorTipo(ejercito_Rojo);
    atacarAleatorio(ejercito_Azul, ejercito_Rojo, 'Azul');
    const despuesRojo = contarVivasPorTipo(ejercito_Rojo);
    mostrarPerdidasTurno(antesRojo, despuesRojo, 'Rojo');
  }

  turno++; // siguiente turno
}
// se muestra en consola los resiltados

const ganador = contarVivos(ejercito_Azul) > 0 ? 'Azul' : 'Rojo';
const fuerzamax = ((stats.criticos / stats.totalAtaques) * 100).toFixed(2);

console.log(`GANADOR ${ganador} ha ganado la guerra!`);
console.log(`Total de ataques: ${stats.totalAtaques}`);
console.log(`Golpes críticos: ${stats.criticos}`);
console.log(`% de ataques con fuerza máxima: ${fuerzamax}%`);
console.log("Unidades eliminadas:");
console.log('Ejército Azul eliminó:', stats.eliminadas['Azul']);
console.log('Ejército Rojo eliminó:', stats.eliminadas['Rojo']);
console.log(`Ataques efectivos: ${stats.ataquesEfectivos}`);

mostrarEstadisticas(ejercito_Azul, 'Azul');
mostrarEstadisticas(ejercito_Rojo, 'Rojo');
console.groupEnd();