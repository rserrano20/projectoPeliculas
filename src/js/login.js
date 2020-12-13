import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import 'jquery';
import 'popper.js'
import Usuario from './usuario.js';

let registroUsuarios=[];
let UsuariosActivos = [];

function leerLS(){
    if(localStorage.length>0){
        registroUsuarios = JSON.parse(localStorage.getItem('Usuarios'));
    }
    if(localStorage.getItem("Usuarios") === null){
        cargarAdministradorDefecto();
    }
}
function cargarAdministradorDefecto(){
    let administrdor = new Usuario('Rosario', 'Serrano', 'admin1234', 'rserrano@gmail.com', 'Administrador');
    registroUsuarios = [administrdor]
    localStorage.setItem('Usuarios', JSON.stringify(registroUsuarios));
}

function buscarUsuario(correoUsuario){
    leerLS();
    let usuarioEncontrado = registroUsuarios.find(function(usuario){
        if(usuario.correo == correoUsuario){
            let usuario = new Usuario(registroUsuarios.nombre, registroUsuarios.apellido, 
                registroUsuarios.cotraseña, registroUsuarios.correo, registroUsuarios.tipo);
            return usuario;
        }else{
            return null;
        }
    });
    return usuarioEncontrado;
}
//Para saber si el Correo es valido
document.getElementById('email').addEventListener('onblur', function(){
    if(document.getElementById('email').value == buscarUsuario(document.getElementById('email').value).correo){
        document.getElementById('email').className = "form-control is-valid";
    }else{
        document.getElementById('email').className = "form-control is-invalid";
    }
});
//Para comprobar que la contraseña no sea vacia
document.getElementById('pass').addEventListener('onblur', function(){
    if(document.getElementById('pass').value == ""){
        document.getElementById('pass').className = "form-control is-invalid";
    }else{
        document.getElementById('pass').className = "form-control is-valid";
    }
});

window.validarSesion = function(e){
    e.preventDefault();
    let usuario = buscarUsuario(document.getElementById('email').value);
    if(usuario != null){
        if(usuario.correo == document.getElementById('email').value && validarContra(usuario.contraseña, document.getElementById('pass').value)){
            alert("BIENVENIDO "+usuario.nombre);
            UsuariosActivos.push(usuario);
            localStorage.setItem('UsuariosActivos', JSON.stringify(UsuariosActivos));
            
            //Deberiamos mandar al perfil del usuario o mandar al index y remplzar su nombre por el de "iniciar sesion" del nav 
            document.location.reload(true);
            if(usuario.tipo == 'Administrador'){
                location.href = 'admin.html';
            }else{
                location.href = 'index.html';
            }
        }
    }else{
        document.getElementById('email').className = 'form-control is-invalid';
    }
}

function validarContra(usuario, contra){
    if(usuario != contra){
        document.getElementById('pass').className = 'form-control is-invalid';
        return false;
    }else{
        return true;
    }
}


