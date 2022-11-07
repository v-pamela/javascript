// Variables Globales
let carrito       = [];
let productos     = [];

let gestor;
const DateTime = luxon.DateTime
const key_actualizacion = "ultima_actualizacion";
const key_carrito = "carrito";



// Evento que se dispara cuadno se carga la pagina
document.addEventListener('DOMContentLoaded', () => {

    // Cargar el carrito con el localstorage, si no hay nada asignarle un array vacio
    carrito = JSON.parse( localStorage.getItem(key_carrito) ) || [];

    let ingreso = localStorage.getItem(key_actualizacion);

    ingreso ? console.log("Ultimo ingreso" + ingreso) : console.log("no esta registrado el ultimo ingreso");

    gestor = new GestionarProductos();
    gestor.iniciar();
})

// Funcion para agregar al carrito un articulo
function addCarrito( id ) {
    
    const prod = document.querySelector('#row_'+id);
    let producto = new Producto (   id,
                                    prod.querySelector('h3').textContent,
                                    prod.querySelector('.precio').textContent.substring(1,6),
                                    prod.querySelector('img').src
                                );

   
    gestor.addCart( producto );
}

// Eliminar un articulo del carrito
function eliminar( id ) {   
    gestor.eliminarArticulo( id );
}

// Eventos de tecla para buscador
document.querySelector('#buscar').addEventListener('keyup', () => {

    let q = document.querySelector('#buscar').value;

    //Empezamos a buscar solo cuadno hay se hayan tipeado mas 2 letras o mas
    if( q.length >= 2 ) { 

        
        gestor.mostrarHeader(`Resultados para: ${q}`);
        gestor.buscar( q );        

    } else if ( q.length === 0 ) {
        
        //Muestro todo sino hay nada el buscador   
        
        gestor.mostrarHeader('Todos los productos en stock');
        gestor.cargarProductos( productos );
    } 

})




