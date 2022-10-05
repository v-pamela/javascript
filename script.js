function registrarse() {
  let usuario= prompt ("Ingrese su usuario:");
  let pass=prompt ("Ingrese su contraseña:");

  let usuario_1="Pame";
  let pass_1="1234";
  
  var permitido= false ;
  
  while(!permitido){
    
    if (usuario==usuario_1){
      console.log("El usuario ya esta registrado");
      usuario=prompt ("Ingrese su usuario:");
      pass=prompt ("Ingrese su contraseña:");
    }else{
      permitido=true;
    }
    
  }
    
}

let nombre = prompt ("Ingrese su nombre:");
while (nombre == "") {
  alert("Por favor ingrese su nombre:");
  nombre =prompt ("Ingrese su nombre:");
}

let respuesta=confirm("¿ Quiere resgistrarse ?");
if (respuesta){
  alert("Bienvenido "+nombre);
  registrarse();
}
