//se definen constantes base
const vida_submarino = 2500;
const ataque_submarino = 500;
//configuramos las unidades basado al submarino
const unidadesConfig = {
  'Soldado Regular':{ rango: [500, 1000],vida: 2 / 12, ataque: 1 / 14 },
  'Soldado Profesional':{ rango: [500, 1000],vida: 3 / 12, ataque: 2 / 14 },
  'Soldado Elite':{ rango: [200, 300],vida: 4 / 12, ataque: 3 / 14 },
  'Tanque':{ rango: [50, 100],vida: 7 / 12, ataque: 4 / 14 },
  'Helicóptero':{ rango: [30, 50],vida: 8 / 12, ataque: 5 / 14 },
  'Avión':{ rango: [50, 75],vida: 10 / 12, ataque: 6 / 14 },
  'Submarino':{ rango: [1, 2],vida: 1, ataque: 1 }
};
// generamos un numero aleatorio 
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// reduccion por el clima
function reducirPorClima(valor) {
  const porcentaje = Math.random() * 0.3;
  return Math.floor(valor * (1 - porcentaje));
}
//creamos el ejercito con todas las unidades segun los requerimientos  
function crearEjercito() {
  const ejercito = [];
  const creados = {};

  for (const tipo in unidadesConfig) {
    const config = unidadesConfig[tipo];
// definimos la cantidad aleatoria
    const cantidad = getRandom(...config.rango);
    creados[tipo] = cantidad;
// generamos la condicion para el array
    for (let i = 0; i < cantidad; i++) {
      ejercito.push({
        nombre: tipo,
        vidaMax: config.vida * vida_submarino,
        vida: config.vida * vida_submarino,
        ataqueMax: config.ataque *ataque_submarino
      });
    }
  }
  return { ejercito, creados};
}
// creaos la funcion para contar los vivos
function contarVivos(ejercito) {
  return ejercito.filter(u => u.vida > 0).length;
}
// en una constante almacenamos los resultados
const stats = {
  criticos: 0,
  ataquesEfectivos: 0,
  totalAtaques: 0,
  eliminadas: { Azul: {}, Rojo: {} },
  perdidas: { Azul: {}, Rojo: {} }
};
// funcion en la guerra
function atacar(atacantes, defensores, colorAtacante) {
  atacantes.forEach(atacante => {
    if (atacante.vida <= 0) return;
//randon del ataque 
    const base = getRandom(1, atacante.ataqueMax);
//se aplica reduccion por clima
    const real = reducirPorClima(base);
// ataque a unidad viva enemiga
    const objetivo = defensores.find(u => u.vida > 0);
    if (!objetivo) return;

    stats.totalAtaques++;
    objetivo.vida -= real;
// Estadísticas de ataque
    if (real > 0) stats.ataquesEfectivos++;
    if (base === atacante.ataqueMax) stats.criticos++;

    if (objetivo.vida <= 0) {
      const tipo = objetivo.nombre;
      stats.eliminadas[colorAtacante][tipo] = (stats.eliminadas[colorAtacante][tipo] || 0) + 1;
    }
  });
}
// nos muestra turno y tropas vivas en la consola
function mostrarResumenTurno(turno, vivos_Azul, vivos_Rojo) {
  console.log(`Turno de ataque ${turno}`);
  console.log(`Ejército Azul: ${vivos_Azul} vivos`);
  console.log(`Ejército Rojo: ${vivos_Rojo} vivos`);
}
// con esta funcion vamos contando resiltado del ataque
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
//mostramos en consola resultados
  console.log(`Estadísticas ejército ${color} `);
  console.log('Unidades perdidas:', stats.perdidas[color]);
  console.log('Unidades ilesas:', ilesos);
  console.log('Unidades para ir al médico o reparacion (vida con menos del 30%):', heridos);
}
// se llaman los ejercitos 
const{ejercito:ejercito_Azul, creados:creadosAzul}= crearEjercito();
const{ejercito:ejercito_Rojo, creados:creadosRojo}= crearEjercito();
// mostramos en consola los ejercitos creados random
console.log("se crearon asi los ejercitos");
console.log("ejercito azul:", creadosAzul);
console.log("ejercito Rojo:", creadosRojo);
//determinamos 1 turno 
let turno = 1;
//randon para ataque primero
let turnoInicial = Math.random() < 0.5 ? 'Azul' : 'Rojo';
//mostramos en consola
console.groupCollapsed("empieza la guerra");
console.log(`ataca el ejército ${turnoInicial}`);
// condicion para atacar mientras esten vivos y cumple la condicion
while (contarVivos(ejercito_Azul) > 0 && contarVivos(ejercito_Rojo) > 0) {
  if (turnoInicial === 'Azul') {
    atacar(ejercito_Azul, ejercito_Rojo, 'Azul');
    atacar(ejercito_Rojo, ejercito_Azul, 'Rojo');
  } else {
    atacar(ejercito_Rojo, ejercito_Azul, 'Rojo');
    atacar(ejercito_Azul, ejercito_Rojo, 'Azul');
  }

  mostrarResumenTurno(turno, contarVivos(ejercito_Azul), contarVivos(ejercito_Rojo));
  turno++;
}
//cuando se cumpla la condicion se determina el reultados 
const ganador = contarVivos(ejercito_Azul) > 0 ? 'Azul' : 'Rojo';
const fuerzamax = ((stats.criticos / stats.totalAtaques) * 100).toFixed(2);
// mostramos en consola los resiltados
console.log(`El ejército ${ganador} ha ganado la guerra!`);
console.log(`total de ataques: ${stats.totalAtaques}`);
console.log(`Golpes críticos: ${stats.criticos}`);
console.log(`fuerza maxima de la unidad: ${fuerzamax}`);
console.log(`Unidades eliminadas:`);
console.log('Ejército Azul eliminó:', stats.eliminadas['Azul']);
console.log('Ejército Rojo eliminó:', stats.eliminadas['Rojo']);
console.log(`Ataques efectivos que quito vida al enemigo: ${stats.ataquesEfectivos}`);
//se muestran en consola las estadisticas de cada ejercito 
mostrarEstadisticas(ejercito_Azul, 'Azul');
mostrarEstadisticas(ejercito_Rojo, 'Rojo');
console.groupEnd();