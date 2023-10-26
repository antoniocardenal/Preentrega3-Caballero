// Precio por noche para cada tipo de habitación
const preciosPorNoche = {
  estandar: 750,
  deluxe: 1500,
  suite: 2000
};

// Array para almacenar las reservas
let reservas = [];

// Función para calcular el costo total de una reserva
function calcularCostoReserva(cantidadNoches, tipoHabitacion) {
  if (tipoHabitacion in preciosPorNoche) {
    return preciosPorNoche[tipoHabitacion] * cantidadNoches;
  } else {
    console.log("No encontramos la habitación que buscabas.");
    return 0;
  }
}

// Obtener historial de reservas desde LocalStorage
const historialReservas = JSON.parse(localStorage.getItem('historialReservas')) || [];

// Agregar las reservas del historial al array de reservas
reservas = reservas.concat(historialReservas);

// Función para mostrar las reservas en el DOM
function mostrarReservas() {
  const listaReservas = document.getElementById('lista-reservas');
  listaReservas.innerHTML = '';

  let costoTotal = 0;

  reservas.forEach((reserva, index) => {
    const itemReserva = document.createElement('li');
    const costoReserva = calcularCostoReserva(reserva.cantidadNoches, reserva.tipoHabitacion);
    costoTotal += costoReserva;
    itemReserva.textContent = `Reserva ${index + 1} - ${reserva.cantidadNoches} noches en ${reserva.tipoHabitacion.charAt(0).toUpperCase() + reserva.tipoHabitacion.slice(1)} - Costo: $${costoReserva}MXN`;
    listaReservas.appendChild(itemReserva);
  });

  // Muestra el costo total de todas las reservas
  const costoTotalElement = document.getElementById('costo-total');
  costoTotalElement.textContent = `Costo total de todas las reservas: $${costoTotal}MXN`;
}

// Mostrar las reservas iniciales
mostrarReservas();

// Función para limpiar el historial de reservas
function limpiarHistorial() {
  localStorage.removeItem('historialReservas');
  historialReservas.length = 0;
  reservas.length = 0;
  mostrarReservas();
}

// Evento del botón para realizar una reserva
const botonReservar = document.getElementById('boton-reservar');
botonReservar.addEventListener('click', () => {
  const cantidadNoches = parseInt(document.getElementById('cantidad-noches').value);
  const tipoHabitacion = document.getElementById('tipo-habitacion').value;

  const costoReserva = calcularCostoReserva(cantidadNoches, tipoHabitacion);
  if (costoReserva > 0) {
    reservas.push({ cantidadNoches, tipoHabitacion });
    mostrarReservas();

    // Actualizar el historial de reservas en LocalStorage
    historialReservas.push({ cantidadNoches, tipoHabitacion });
    localStorage.setItem('historialReservas', JSON.stringify(historialReservas));
  }
});

// Evento del botón para limpiar el historial de reservas
const botonLimpiar = document.getElementById('boton-limpiar');
botonLimpiar.addEventListener('click', limpiarHistorial);
