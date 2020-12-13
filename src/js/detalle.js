import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';

let registroJuegos = [];
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


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    
    leerLS();
    
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    let bodyDetalle = document.getElementById('bodyDetalle');
    
    let juego = registroJuegos.find(function(item){
        return item.codigo == decodeURIComponent(results[2].replace(/\+/g, ' '));
    });
    
    bodyDetalle.innerHTML = `
    <article>
        <div class="text-center">
            <img src="img/categorias/${juego.categoria}/${juego.url}" alt="${juego.nombre} imagen" width="200px" class="efectoimg">
        </div>
        <p class="lead text-center white-t mt-3">Checkea nuestros proximos lanzamientos. Pre-ordenalos y obten un 20% de descuento!</p>
        <hr>
        <ul>
            <li><strong>Nombre:</strong> ${juego.nombre}</li>
            <li><strong>Descripcion del juego:</strong> ${juego.descripcion} </li>
            <li><strong>Categoria:</strong> ${juego.categoria} </li>
            <a href="error404.html" class="btn btn-primary mx-1 mt-3 efectoimg">Comprar</a>
        </ul>
    </article>`;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let prodId = getParameterByName('Id');


function leerLS(){
    if(localStorage.length>0){
        registroJuegos = JSON.parse(localStorage.getItem('Juegos'));
        registroUsuariosActivos = JSON.parse(localStorage.getItem('UsuariosActivos'));
    }
}


