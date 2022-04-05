// Variables
const carrito = document.querySelector('#carrito');
const listaHerramientas = document.querySelector('#lista-herramientas');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = []; 

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // cuando se presiona "Agregar Carrito"
    listaHerramientas.addEventListener('click', agregarHerramienta);
    //console.log("agregando al carrito...")   
    carrito.addEventListener('click', eliminarHerramienta)
    
    //muestra los productos del Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones

// Función para agregar el producto al carrito
function agregarHerramienta(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const herramientaSeleccionada = e.target.parentElement.parentElement;
        leerDatosProducto(herramientaSeleccionada);
    }
}

function eliminarHerramienta(e){
    if (e.target.classList.contains ('borrar-producto')){
        const productoId = e.target.getAttribute('dataId');
        //elimina del arreglo de articulosCarrito por el dataId
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML();//para volver a mostrar el html del carrito
    }
}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('dataId'),
        cantidad: 1,
    }
    //para revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) //actualiza la cantidad
            {
        const producto = articulosCarrito.map (producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto; //retorna el objeto actualizado
            }
            else{
                return producto; //retorna los objetos que no son actualizados
            }
        });
        articulosCarrito = [...producto];
    }else{
        //Agrega los elementos al carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    console.log(articulosCarrito);
    carritoHTML();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
//Mostrar el carrito
function carritoHTML() {
//limpiar el html
limpiarHTML();
//recorre el carrito y genera el html
    articulosCarrito.forEach ((producto)=>{
        const {imagen, titulo, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width=100></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#"class="borrar-producto" dataId="${id}"> X </a></td>    
        `
        //agregar en el table body
        contenedorCarrito.appendChild(row);
    });
    //Agregar el carrito al local storage
    sincronizarStorage();
}


// Eliminar los productos del table body
function limpiarHTML(){
    contenedorCarrito.innerHTML= '';
}

function vaciarCarrito(){
    // contenedorCarrito.innerHTML= '';
    
    while (contenedorCarrito.firstElementChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    } 
        //sweet alert para borrar el carrito
        Swal.fire({
            title: 'Vaciar el carrito?',
            text: "Se perderá todo lo guardado hasta ahora",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1eaedb',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, vaciar el carrito!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Borrado!',
            'Su carrito está vacío.',
            'success'
            )
        }
        })  
}

// Fetch desde archivo JSON
const cargarJSONArrayBtn = document.querySelector('#cargarJSON');
cargarJSONArrayBtn.addEventListener('click', obtenerDatos);

function obtenerDatos() {
    Swal.fire('Solicite nuestro catálogo completo!')
    fetch('js/data.json') 
        .then( respuesta => {
            return respuesta.json()
        }) 
        .then(resultado => {
            mostrarHTML(resultado);
            console.log(resultado)
        })
}

function mostrarHTML(insumos) {
    const contenido = document.querySelector('#contenido');
    let htmlInsumos = '';
    insumos.forEach( insumo => {
        const { dataId, nombre, tamanio, cantidad, codigo, precio, img} = insumo;
        htmlInsumos += `
                        <div class="four columns">
                            <div class="card">
                            <img src="${img}" class="imagen-herramienta u-full-width">
                                <div class="info-card">
                                    <h4>${nombre}</h4>
                                    <p>Tamaño: ${tamanio} </p>
                                    <p>Cantidad: ${cantidad} </p>
                                    <p>Código: ${codigo} </p>
                                    <p>ID: ${dataId} </p>
                                    <p class="precio"><span class="u-pull-right ">$${precio}</span></p>
                                    <a href="#" class="u-full-width button-primary button input agregar-carrito" dataId="${dataId}">Agregar Al Carrito</a>
                                </div>
                            </div>
                        </div>
                        `
    });
    contenido.innerHTML = htmlInsumos;
}


