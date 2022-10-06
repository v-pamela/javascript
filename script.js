let nombre = prompt ("Ingrese su nombre:");
let usuario_1="Pame";
let pass_1="1234";

while (nombre == "") {
  alert("Por favor ingrese su nombre:");
  nombre =prompt ("Ingrese su nombre:");
}

let respuesta=confirm("¿ Quiere resgistrarse ?");
if (respuesta){
  alert("Bienvenido "+nombre);
  registrarse();
  carrito();
}else{
  let registrado=confirm("¿Esta registrado?");
  if (registrado){
    let usuario= prompt ("Ingrese su usuario:");
    let pass=prompt ("Ingrese su contraseña:");
    
    if (usuario==usuario_1 && pass==pass_1){
      alert("El usuario esta registrado:");
      carrito();
    }else{
      alert("El usuario no esta registrado o contraseña incorrecta")
    }
}
}

function registrarse() {
  let usuario= prompt ("Ingrese su usuario:");
  let pass=prompt ("Ingrese su contraseña:");
  
  var permitido= false ;
  
  while(!permitido){
    
    if (usuario==usuario_1){
      alert("El usuario ya esta registrado");
      usuario=prompt ("Ingrese su usuario:");
      pass=prompt ("Ingrese su contraseña:");
    }else{
      permitido=true;
    }
    
  }
    
}

function carrito() {
  let lista="";

  var finalizar_carrito=false;

  while(!finalizar_carrito){
    
    let articulo=prompt ("Ingrese un articulo entre 1 y 10 inclusive:");
    let producto=enlistar_articulo(articulo);

    if (producto){
      
      console.log(producto);
      lista +="\n"+producto;
      
    }else{
      
      if(articulo== null){
        finalizar_carrito=true;
      }else{
        alert("Ingrese un codigo valido:");
      }
    }

    if(lista!=""){
      let respuesta_compra=confirm("Desea concretar la compra de :"+lista);
      if(respuesta_compra){
        alert("GRACIAS POR SU COMPRA!!");
      }
    }
    
  }
  
}

function enlistar_articulo(articulo) {

  let producto;

  switch(articulo){

    case "1":
      producto=" Producto 01";
      break;
    case "2":
      producto=" Producto 02";
      break;
    case "3":
      producto=" Producto 03";
      break;
    case "4":
      producto=" Producto 04";
      break;
    case "5":
      producto=" Producto 05";
      break;
    case "6":
      producto=" Producto 06";
      break;
    case "7":
      producto=" Producto 07";
      break;
    case "8":
      producto=" Producto 08";
      break;
    case "9":
      producto=" Producto 09";
      break;
    case "10":
      producto=" Producto 10";
      break;
      
    default:
      producto=false;
  }
}
