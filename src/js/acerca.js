import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import 'jquery';
import 'popper.js'

let registroUsuariosActivos = [];
leerLSActivo();
function leerLSActivo(){
    if(localStorage.getItem('UsuariosActivos')!= null){
        leerLS();
        
        let nav = document.getElementById('tipoNav');
        nav.innerHTML = `
        <div class="container">
            <a class="navbar-brand efectoimg" href="index.html" target="blank">
                <img src="img/logo3.png" alt="logo startGamer" class="logo">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto list-unstyled">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">INICIO |</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contacto.html">CONTACTO |</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="acerca.html">ACERCA DE |</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link efectoimg" onclick="direccionarAdmin()">${registroUsuariosActivos[0].nombre}
                            <i class="fas fa-user"></i>
                        </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link efectoimg" onclick="cerrarSesion()">
                            <i class="fas fa-sign-out-alt"></i></a>
                    </li>
                </ul>
            </div>
        </div>`
    }
}
window.direccionarAdmin =function(){
    if(registroUsuariosActivos[0].tipo == 'Administrador'){
        location.href = 'admin.html';
    }
}
window.cerrarSesion = function(){
    localStorage.removeItem('UsuariosActivos');
    document.location.reload(true);
}

function leerLS(){
    if(localStorage.length>0){
        registroUsuariosActivos = JSON.parse(localStorage.getItem('UsuariosActivos'));
    }
}

