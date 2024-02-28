// ------------------------------------------------------------------------------------------------------

// SALUDO DE BIENVENIDA
function ocultarSaludo() {
  // Obtener los elementos por su id
  var saludoElement = document.getElementById("saludo");
  var contenidoElement = document.getElementById("contenido");

  // Ocultar el saludo
  saludoElement.classList.add("oculto");

  // Mostrar el contenido principal
  contenidoElement.classList.remove("oculto");
}
function animacionSalida(){
  // Obtener elemento por su id
  var elementoSalida = document.getElementById("saludo")
  // Asignamos la clase de animacion
  elementoSalida.classList.add("animate__animated")
  elementoSalida.classList.add("animate__fadeOut")
}
function animacionEntrada(){
  var elementoEntrada = document.getElementById("contenido")
  // asignamos la clase de animacion
  elementoEntrada.classList.add("animate__animated")
  elementoEntrada.classList.add("animate__fadeIn")
}
// Utilizar el setTimeout para programar la ejecucion de la animacion despues de 1 segundo
setTimeout(animacionSalida, 1000)
// Utilizar setTimeout para programar la ejecución de la función ocultar saludo despues de 2 segundos
setTimeout(ocultarSaludo, 2000);
// Utilizar el setTimeout para programar el inicio de la asignacion de animacion
setTimeout(animacionEntrada, 1800);

// ------------------------------------------------------------------------------------------------------

// CREACION DE FORMULARIO VERSION MODAL
const btnAbrirModal = document.querySelector("#btn-abrir-modal")
const btnCerrarModal = document.querySelector("#btn-cerrar-modal")
const modal = document.querySelector("#modal") 

btnAbrirModal.addEventListener("click",()=>{
  modal.showModal();
})
btnCerrarModal.addEventListener("click",(event)=>{
  modal.close();
})

// ------------------------------------------------------------------------------------------------------

var listaDatos = [];

// ...

// Función para agregar una fila a la tabla
function agregarFila(identificador, direccion, estado) {
  var containerDiv = document.getElementById('tabla-container');
  var newRow = containerDiv.insertRow(-1);

  // Añadir celdas para nombre, URL, estado y el botón "X"
  var identificadorCell = newRow.insertCell(0);
  var direccionCell = newRow.insertCell(1);
  var estadoCell = newRow.insertCell(2);
  var accionesCell = newRow.insertCell(3);

  identificadorCell.innerHTML = identificador;
  direccionCell.innerHTML = direccion;
  estadoCell.innerHTML = estado;

  // Crear el botón "X" y asignarle un evento de clic
  var botonX = document.createElement('button');
  botonX.innerHTML = 'X';
  botonX.addEventListener('click', function () {
      // Eliminar la fila al hacer clic en el botón "X"
      containerDiv.deleteRow(newRow.rowIndex);
      listaDatos.splice(newRow.rowIndex - 1, 1); // Eliminar el elemento correspondiente en la listaDatos
      guardarDatosLocalStorage(); // Actualizar el almacenamiento local
  });

  accionesCell.appendChild(botonX);
}

// Función para guardar datos en el almacenamiento local
function guardarDatosLocalStorage() {
  localStorage.setItem('listaDatos', JSON.stringify(listaDatos));
}

// Función para recuperar datos del almacenamiento local
function recuperarDatosLocalStorage() {
  var datosGuardados = localStorage.getItem('listaDatos');
  if (datosGuardados) {
      listaDatos = JSON.parse(datosGuardados);
      // Llenar la tabla con los datos guardados al cargar la página
      for (var i = 0; i < listaDatos.length; i++) {
          agregarFila(listaDatos[i].identificador, listaDatos[i].direccion, listaDatos[i].estado);
      }
  }
}





// ...

// CAPTURA DE DATOS MEDIANTE FORMULARIO
var formulario = document.querySelector("form");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  identificador = document.querySelector("#nombre").value;
  direccion = document.querySelector("#url").value;

  if (identificador != '' && direccion != '') {
      var dato = {
          identificador,
          direccion,
          estado: 'inactivo'
      };

      listaDatos.push(dato);

      // Agregar la nueva fila con el botón "X"
      agregarFila(identificador, direccion, dato.estado);
      document.querySelector("#nombre").value = "";
      document.querySelector("#url").value = "";

      guardarDatosLocalStorage(); // Actualizar el almacenamiento local
  } else {
      alert("No dejes campos vacíos.");
  }
});

// Recuperar datos almacenados al cargar la página
recuperarDatosLocalStorage();