//defino la funcion contructora de habitaciones. Todas las habitaciones se contruyen con estas propiedades
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
    // this.saludar = function() {
    //     alert("Hola")
    // }
    // this.venta = function(cantidadComprada){
    //     this.stock -= cantidadComprada
    //     alert("Se vendieron: " + cantidadComprada + " unidades") //con esto reemplazo la función stockSuficienciente
    // }

}
//Genero los nuevos objetos
const HabitacionSimple = new Habitacion ("Simple", 5, 1000, 1, "S", "Frigobar / Microondas", 1, "King Size", 1)
const HabitacionDoble = new Habitacion ("Doble", 5, 2000, 1, "S", "Frigobar", 2, "King Size", 2)
const HabitacionTriple = new Habitacion ("Triple", 5, 3000, 1, "S", "Frigobar / Microondas", 3, "2 Plazas Standar", 3)
const HabitacionEjecutiva = new Habitacion ("Ejecutiva", 2, 6000, 1, "S", "Frigobar / Microondas / Escritorio", 2, "King Size", 1)

//definición de ARRAY
const listadoHabitaciones = [HabitacionSimple, HabitacionDoble, HabitacionTriple, HabitacionEjecutiva]

//for..of

//  for (const habitacion of listaHabitaciones){
//     console.log(habitacion.nombre)
// }

function menu(){
    let opcion = prompt("Menu: \n1 - Tipo de Habitaciones\n2 - Saludar\nS- Salir")

    switch(opcion){
        case "1":
            listarHabitaciones();
            reservarHabitacion();
            break;
        case "2":
            saludar("Bienvenido a");
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


function saludar(saludo){
    alert(saludo + " nuestro Hotel!")
}

function listarHabitaciones(){
    alert("Estas son nuestras habitaciones: \n1- " + listadoHabitaciones[0].nombre + "\n2- " + listadoHabitaciones[1].nombre + "\n3- " + listadoHabitaciones[2].nombre + "\n4- " + listadoHabitaciones[3].nombre)
}

let cantidadComprada;
let precioTotalVenta = 0;

function stockInsuficiente(stock) {
    alert("Solo tenemos disponibles " + stock + " habitaciones de ese tipo")
}

function stockSuficiente(stock, nombre) {
    stock -= cantidadComprada;
    console.log("Habitaciones disponibles: " + stock + " " + nombre);
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

    alert("El precio de su compra es de: $" + precioTotalVenta);
}

menu()