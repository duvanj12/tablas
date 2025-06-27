// Declaración de variables con cada tipo de dato primitivo
let stringValue = 'inicio';
let numberValue = 42;
let booleanValue = true;
let nullValue = null;
let undefinedValue = undefined;
let bigIntValue = 9007199254740991n; // BigInt
let symbolValue = Symbol('miSimbolo');

// Mostrar en consola dentro de un grupo colapsado
console.groupCollapsed('Valores iniciales');
console.log('String:', stringValue);
console.error('Number:', numberValue);
console.debug('Boolean:', booleanValue);
console.log('Null:', nullValue);
console.error('Undefined:', undefinedValue);
console.debug('BigInt:', bigIntValue);
console.log('Symbol:', symbolValue);
console.groupEnd();

// Cambiar los valores de las variables
stringValue = 'fin';
numberValue = 100;
booleanValue = false;
nullValue = 'Ya no es null';
undefinedValue = 'Ahora tiene valor';
bigIntValue = 12345678901234567890n;
symbolValue = Symbol('nuevoSimbolo');

// Mostrar los nuevos valores con diferentes métodos de consola
console.groupCollapsed('Valores modificados');
console.debug('String:', stringValue); // Cambiado a debug
console.log('Number:', numberValue);   // Cambiado a log
console.error('Boolean:', booleanValue); // Cambiado a error
console.debug('Null:', nullValue);     // Cambiado a debug
console.log('Undefined:', undefinedValue); // Cambiado a log
console.error('BigInt:', bigIntValue); // Cambiado a error
console.debug('Symbol:', symbolValue); // Cambiado a debug
console.groupEnd();