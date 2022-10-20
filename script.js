
const nombre_usuario="Pame";
const pass_usuario="1234";
const mail_usuario = "pame@gmail.com";



let respuesta = confirm ("Desea registrarse en la pagina?") ;


if (respuesta) {

    pedir_datos();

}


function pedir_datos(){

    let nombre = prompt ("Ingrese su nombre");
    let mail = prompt ("Ingrese su email");
    let pass = prompt ("Ingrese su pass");

    if (nombre && mail && pass ){


        let validacion = validar_datos(nombre,mail);

        if (validacion){

          const usuario = new Usuario (nombre,mail,pass);
           usuario.mostrar_bienvenida();

        }else{

           pedir_datos();

        }

    }else{

        alert("Tenes que completar todos los datos") ;

    }

}


function validar_datos(nombre,mail){


    if (nombre === nombre_usuario){

        alert("Ese nombre de usuario ya exite");
        return false;

    }


    if (mail === mail_usuario){

        alert("Ese mail ya existe");
        return false;

    }

    return true ;

}


class Producto {


    constructor (modelo,marca,precio){

        this.modelo = modelo ;
        this.marca = marca ;
        this.precio = precio;
        this.id = -1;
    }

    mostrar_descripcion(){

        return (this.id + " - " +this.modelo + " - " + this.marca + " - $" + this.precio) ;



    }

    set_id(nuevo_id){

        this.id = nuevo_id ;
    }


}


let arreglo_producto = new Array ();


let gen_id = 1 ;

alert("Bienvenidos al sistemas de compra y venta de cremas y serums");

let flag = true ;

while (flag){

    let mensaje = "Indique lo que desea hacer: ";
    mensaje +=    "\n1) Cargar nuevo producto ";
    mensaje +=    "\n2) Eliminar producto ";
    mensaje +=    "\n3) Mostrar productos en stock " ;
    mensaje +=    "\n4) Aplicar descuento " ;
    mensaje +=    "\n5) Salir " ;



    let resp = prompt(mensaje) ;

    switch (resp){

        case "1" : 
                ingresar_nuevo_producto();
                break;
        case "2" :          
                eliminar_producto();
                break;
        case "3" :
                mostrar_autos();
                break;
        case "4"  : 
                aplicar_descuento();
                break;
        case "5" : 
                alert("Gracias por utilizar nuestra pagina :) ");
                flag=false;
                break;        
        case null : 
                alert("Gracias por utilizar nuestra pagina :) ");
                flag=false;
                break;
        default : 
                alert ("No ingreso una opcion valida") ;                     


    }

}


function ingresar_nuevo_producto(){

    let producto = solicitar_datos_producto ();

    if (producto) {


        producto.set_id(gen_id);
        gen_id ++ ;

        arreglo_producto.push(producto);



    }


}


function solicitar_datos_producto(){

    let check = true ;

    while (check){


        let msj = "" ;

        let marca = prompt("Ingrese marca").trim();
        let modelo = prompt ("ingrese modelo").trim();
        let precio = parseFloat(prompt ("Ingrese precio")); 


        if (!marca){

            msj += "\nDebe ingresar marca";

        }

        if (!modelo){

            msj += "\nDebe ingresar modelo" ;
        }

        if (isNaN(precio)){

            msj += "\nDebe ingresar un valor numerico en precio";

        }


        if (msj != ""){

            alert(msj);
            check = confirm ("Desea cargar de nuevo los datos");


        }else {


            return new producto (marca,modelo,precio);




        }




    }


    return false ;

}



function eliminar_producto (){


    if (existen_autos()){


        mostrar_autos();

        let id_ingresado = prompt("Ingrese el id del producto a eliminar");

        if (id_ingresado){


            let auto_encontrado = arreglo_auto.find((a)=> a.id == id_ingresado);

            if (auto_encontrado){


                let resp = confirm ("Esta seguro de que desea eliminar el producto "+auto_encontrado.mostrar_descripcion() + " ?");
                if (resp) {


                    arreglo_auto =arreglo_auto.filter ((a) => a.id != id_ingresado) ;
                    alert("Producto eliminado con exito");

                }

            }



        }



    }



}


function existen_productos(){

    if (arreglo_auto.length == 0) {

        alert("No hay autos en stock");

        return false ;
    }


    return true ;

}

function mostrar_productos(){

    if (existen_productos()) {

        let resp = prompt("La info se mostrara ordenada por precio.\n Desea verla en forma Ascendente (A) o Desendente (D)").toUpperCase() ;
        if (resp == "A") {

            arreglo_auto.sort((a,b) =>{
                
                if (a.precio > b.precio) {
                    return 1;
                }
                if (a.precio < b.precio) {
                    return -1;
                }
                
                return 0;
            })
        }

        if (resp == "D"){

            arreglo_autos.sort((a,b) =>{
                
                if (a.precio > b.precio) {
                    return -1;
                }
                if (a.precio < b.precio) {
                    return 1;
                }
                
                return 0;
            })
        }

        mostrar_arreglo();
    
    }

}
