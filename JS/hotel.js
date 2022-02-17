let habitacionIndividual = 'Individual';
let stockHabitacionIndividual = 3;
let precioHabitacionIndividual = 1000;

let habitacionFamiliar = 'Familiar';
let stockHabitacionFamiliar = 3;
let precioHabitacionFamiliar = 2000;

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
    alert("Estas son nuestras habitaciones: \n1- " + habitacionIndividual + "\n2- " + habitacionFamiliar)
}

let cantidadComprada;
let precioTotalVenta = 0;

function stockInsuficiente(stock) {
    alert("Solo tenemos disponibles " + stock + " habitaciones de ese tipo")
}

function stockSuficiente(stock, nombre) {
    stock -= cantidadComprada;
    console.log("Habitaciones disponibles: " + stock + nombre);
}

function calcularPrecio(precio){
    precioTotalVenta += cantidadComprada * precio;
}


function compra(stock, precio, nombre) {
    cantidadComprada = parseInt(prompt("Ingrese la cantidad de habitaciones a reservar:"));
    if(cantidadComprada <= stock) {
    stockSuficiente(stock, nombre);
        if(cantidadComprada > 3){ //agrego la cantidad de habitaciones disponibles en total
            calcularPrecio(precio)
        }
        else{
            calcularPrecio(precio, 1)
        }
    }
    else {
        stockInsuficiente(stock)
    }
}


function reservarHabitacion(){

    let cantidadHabitacionesReservadas = parseInt(prompt("Ingrese la cantidad de habitaciones distintas que quiere reservar"))
    

    for (let i = 0; i < cantidadHabitacionesReservadas; i++) {

        let nombreCompra = prompt("Ingrese el tipo de habitacion que quiere reservar:")

        if (nombreCompra == habitacionIndividual) {
            compra(stockHabitacionIndividual, precioHabitacionIndividual, habitacionIndividual)
        }
        else if (nombreCompra == habitacionFamiliar) {
            compra(stockHabitacionFamiliar, precioHabitacionFamiliar, habitacionFamiliar)
        }
        else {
            alert("No disponemos de ese tipo de habitación")
        }
    }

    alert("El precio de su compra es de: $" + precioTotalVenta);
}

menu()