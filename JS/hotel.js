//Definición de Función Construtora de habitaciones
function Habitacion (nombreValor, stockValor, precioValor, descuentoValor, tvhdValor, serviciosValor, capacidadValor, tipoCamaValor, cantidadCamaValor){
    this.nombre = nombreValor;
    this.stock = stockValor;
    this.precio = precioValor;
    this.descuento = descuentoValor;
    this.tvhd = tvhdValor;
    this.servicios = serviciosValor;
    this.capacidad = capacidadValor;
    this.tipocama = tipoCamaValor;
    this.cantidadCama = cantidadCamaValor;
//armando un método
    // this.venta = function(cantidadComprada){
    //     this.stock -= cantidadComprada
    //     alert("Se vendieron: " + cantidadComprada + " unidades") //con esto reemplazo la función stockSuficienciente
    // }
}
//Generación de Nuevos Objetos
const HabitacionSimple = new Habitacion ("Simple", 3, 1000, 1, "S", "Frigobar / Microondas", 1, "King Size", 1)
const HabitacionDoble = new Habitacion ("Doble", 5, 2000, 1, "S", "Frigobar", 2, "Queen Size", 2)
const HabitacionTriple = new Habitacion ("Triple", 4, 3000, 1, "S", "Frigobar / Microondas", 3, "2 Plazas Standard", 3)
const HabitacionEjecutiva = new Habitacion ("Ejecutiva", 2, 6000, 1, "S", "Frigobar / Microondas / Escritorio", 2, "King Size", 1)

//Definición de ARRAY
const listadoHabitaciones = [HabitacionSimple, HabitacionDoble, HabitacionTriple, HabitacionEjecutiva]

//Definición de ARRAY para FILTER
const Habitaciones = [
    {nombre: "Simple", stock: 3, precio: 1000, descuento: 1, tvhd: "S", servicios: "Frigobar / Microondas", capacidad: 1, tipoCama: "King Size", cantidadCama: 1},
    {nombre: "Doble", stock: 5, precio: 2000, descuento: 1, tvhd: "S", servicios: "Frigobar", capacidad: 2, tipoCama: "Queen Size", cantidadCama: 2},
    {nombre: "Triple", stock: 4, precio: 3000, descuento: 1, tvhd: "S", servicios: "Frigobar / Microondas", capacidad: 3, tipoCama: "2 Plazas Standard", cantidadCama: 3},
    {nombre: "Ejecutiva", stock: 2, precio: 6000, descuento: 1, tvhd: "S", servicios: "Frigobar / Microondas / Escritorio", capacidad: 2, tipoCama: "King Size", cantidadCama: 1}

]

//Definición de Variables
let cantidadComprada;
let precioTotalVenta = 0;
let contador = 0;
let listadoHabitacionesMenu = "Estas son nuestras habitaciones: ";


//for..of
for (const habitacion of listadoHabitaciones){
    contador++;
    listadoHabitacionesMenu += "\n" + contador +"- " + habitacion.nombre;
    console.log(habitacion.nombre + " " + habitacion.stock)
}

//Aplicando FILTER
//1
const resultadoServicios = Habitaciones.filter((el) => el.servicios.includes("Escritorio"))
console.log (resultadoServicios)

//2
const resultadoCama = Habitaciones.filter ((el) => el.tipoCama.includes("Queen"))
console.log (resultadoCama)

//Definición de Funciones
function listarHabitaciones(){
    alert(listadoHabitacionesMenu)
}

function menu(){
    let opcion = prompt("Menu: \n1 - Tipo de Habitaciones\n2 - Contacto\nS- Salir")

    switch(opcion){
        case "1":
            listarHabitaciones();
            reservarHabitacion();
            break;
        case "2":
            informacionContacto("contacto");
            menu();
            break;
        case "S":
            saludar("Muchas gracias por su visita")
            break;
        default:
            alert("Opcion Incorrecta")
            menu()
            break;
    }
}

function informacionContacto(contacto){
    alert ("Nuestro nro de teléfono es: 351-123456789")
}

function saludar(saludo){
    alert(saludo + " Lo esperamos en nuestro Hotel!")
}


function stockInsuficiente(stock) {
    alert("Solo tenemos disponibles " + stock + " habitaciones de ese tipo")
}

function stockSuficiente(stock, nombre) {
    stock -= cantidadComprada;
    console.log("Habitaciones remanentes: " + stock + " " + nombre);
}

function calcularPrecio(precio){
    precioTotalVenta += cantidadComprada * precio;
}

function compra(stock, precio, nombre) {
    cantidadComprada = parseInt(prompt("Ingrese la cantidad de habitaciones a reservar:"));
    if(cantidadComprada <= stock) {
        //producto.venta(cantidadComprada)
    stockSuficiente(stock, nombre);
        calcularPrecio(precio)
    }
    else {
        stockInsuficiente(stock)
    }
}

function reservarHabitacion(){
    let cantidadHabitacionesReservadas = parseInt(prompt("Ingrese la cantidad de habitaciones distintas que quiere reservar"))
    for (let i = 0; i < cantidadHabitacionesReservadas; i++) {
        let nombreCompra = prompt("Ingrese el tipo de habitacion que quiere reservar:")
        if (nombreCompra == HabitacionSimple.nombre) {
            compra(HabitacionSimple.stock, HabitacionSimple.precio, HabitacionSimple.nombre)
        }
        else if (nombreCompra == HabitacionDoble.nombre) {
            compra(HabitacionDoble.stock, HabitacionDoble.precio, HabitacionDoble.nombre)
        }
        else if (nombreCompra == HabitacionTriple.nombre) {
            compra(HabitacionTriple.stock, HabitacionTriple.precio, HabitacionTriple.nombre)
        }
        else if (nombreCompra == HabitacionEjecutiva.nombre) {
            compra(HabitacionEjecutiva.stock, HabitacionEjecutiva.precio, HabitacionEjecutiva.nombre)
        }
        else {
            alert("No disponemos de ese tipo de habitación")
        }
    }

    alert("Compra realizada con éxito.\n\nEl monto de su compra es de: $" + precioTotalVenta + "\n\nFecha de Compra: " + new Date);
    
}

menu()