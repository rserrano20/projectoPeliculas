import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import 'jquery';
import 'popper.js'
import {cargarDetalle} from './detalle'
import Juego from './juego.js';
import Usuario from './usuario.js';

let accion1 = new Juego('1', 'AC: Origins', 'Accion/Aventura', 'Un juego que no conozco!', true, '59.99', 'acoo.png')
let accion2 = new Juego('2', 'Prince of Persia', 'Accion/Aventura', 'Agregar Detalle', true, '49.99', 'prince.jpg');
let accion3 = new Juego('3', 'Space Junkies', 'Accion/Aventura', 'Agregar Detalle', true, '29.99', 'spacejunkies-keyart-compofinal_560x698_mobile_292672.jpg');
let accion4 = new Juego('4', 'Far Cry Primal', 'Accion/Aventura', 'Agregar Descrip', true, '39.99', 'primal.jpg');

let disparo1 = new Juego('5', 'Far Cry 3', 'Disparos', 'Far Cry ha sido conocido por llevar al jugador a explorar lugares exóticos, desde islas tropicales hasta zonas desérticas. La serie se caracteriza por ofrecer una experiencia en primera persona combinada con mundo abierto', true, '79.99', 'farcry3.jpg');
let disparo2 = new Juego('6', 'Splinter Cell: Blacklist', 'Disparos', 'Un grupo de 12 naciones ha decidido que ya es suficiente y ha lanzado un ultimátum llamado la Lista Negra, una serie de ataques terroristas en escala contra intereses de EE.UU. en todo el mundo. Sam Fisher es el líder de la recién creada 4th Echelon, una unidad clandestina que responde únicamente ante la presidenta de los Estados Unidos. Sam y su equipo perseguirán a estos terroristas recurriendo a todos los medios necesarios para detener la Lista Negra antes de que se agote la cuenta atrás. ', true, '49.99', 'splinter.jpg');
let disparo3 = new Juego('7', 'Rainbow 6 Siege', 'Disparos', 'Descóp', true, '39.99', 'rainbow6.jpg');
let disparo4 = new Juego('8', 'GR: Breakpoint', 'Disparos', 'El juego se desarrolla en un entorno de mundo abierto llamado Auroa, una isla ficticia en el Océano Pacífico. El jugador asume el papel de Nomad, un agente de fuerzas especiales enviado a la isla para investigar una serie de disturbios que involucran a Skell Technology, un contratista militar asentado en Auroa.', true, '69.99', 'ghost.jpg');

let carrera1 = new Juego('9', 'Trials Rising', 'Carreras', 'descp', true, '29.99', 'moto.jpg');
let carrera2 = new Juego('10', 'The Crew 2', 'Carreras', 'descp', true, '59.99', 'thecrew2.jpg');
let carrera3 = new Juego('11', 'Trackmania: Lagoon', 'Carreras', 'Descp', true, '9.99', 'trackmania.jpg');
let carrera4 = new Juego('12', 'Trackmania: Canyon', 'Carreras', 'desap', true, '19.99', 'canyon.jpg');

let infantil1 = new Juego('12', 'Hungry Shark: Evo', 'Infantiles', 'El jugador controla a un tiburón hambriento que debe alimentarse constantemente para que su salud no se reduzca a cero. Los controles de movimiento incluyen un turbo para moverse a más velocidad hasta agotar su barra de aguante.', true, '19.99', 'shark.jpg');
let infantil2 = new Juego('13', 'Just Dance: Disney', 'Infantiles', 'El modo de juego es idéntico a los otros juegos de la franquicia de Ubisoft, Just Dance. Los jugadores están obligados a realizar movimientos de baile específicos en el tiempo con la música, siguiendo una rutina indicada en pantalla e interpretada por bailarines en vivo. Si el jugador se desempeña bien, bailando con precisión y en tiempo, su puntuación se basará y una calificación de 5 estrellas se obtiene tras la finalización de la pista', true, '39.99', 'disney.png');
let infantil3 = new Juego('14', 'Horse Heaven', 'Infantiles', 'Descp', true, '9.99', 'horse.jpg');
let infantil4 = new Juego('15', 'Grow Up', 'Infantiles', 'Descp', true, '59.99', 'gr.png');

let registroUsuarios = [];
let registroJuegos= [accion1, accion2, accion3, accion4, disparo1, disparo2, disparo3, 
    disparo4, carrera1, carrera2, carrera3, carrera4, infantil1, infantil2, infantil3, infantil4];
cargarIndex();
cargarSlider();

let registroUsuariosActivos = [];
let registroFavoritos = [];
let registroSlider = [];
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
        registroJuegos = JSON.parse(localStorage.getItem('Juegos'));
        registroUsuariosActivos = JSON.parse(localStorage.getItem('UsuariosActivos'));
        registroFavoritos = JSON.parse(localStorage.getItem('Favoritos'));
    }else{
        localStorage.setItem('Juegos', JSON.stringify(registroJuegos));
    }
    if(localStorage.getItem("Usuarios") === null){
        cargarAdministradorDefecto();
    }
    if(localStorage.getItem("Juegos") === null){
        localStorage.setItem('Juegos', JSON.stringify(registroJuegos));
    }
    if(localStorage.getItem("Favoritos") === null){
        
        registroFavoritos = ["1","2","4"]
        localStorage.setItem('Favoritos', JSON.stringify(registroFavoritos));
    }else{
        registroFavoritos = JSON.parse(localStorage.getItem('Favoritos'));
    }
}

function cargarSlider(){
    leerLS();
    registroSlider = [];
    let imgSlaider = document.getElementById("sliderIndex");
    let itemSlider = document.getElementById('itemSlider')
    let codHTML = "";
    let codItem = "";
    let juegoPublicados = registroJuegos.filter(function(item){
        return item.publicado == true;
    });  
   
    for(let i in juegoPublicados){
        for(let x in registroFavoritos){
            if(juegoPublicados[i].codigo == registroFavoritos[x]){
                registroSlider.push(juegoPublicados[i]);
            }
        }
    }
    for(let i in registroSlider){
        if(i==0){
            codItem = `<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>`
        }else{
            codItem = `<li data-target="#carouselExampleCaptions" data-slide-to="${i}"></li>`
        }
        itemSlider.innerHTML += codItem;
        switch(true){
            case registroSlider[i].categoria == 'Accion/Aventura':
                if(i==0){
                    codHTML = `
                    <div class="carousel-item active">
                        <img src="img/categorias/carreras/${registroSlider[i].url}" class="d-block w-100" alt="acv">
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                    </div>`;
                }else{
                    codHTML = `
                    <div class="carousel-item">
                        <img src="img/categorias/carreras/${registroSlider[i].url}" class="d-block w-100" alt="acv">
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                    </div>`;
                }
                imgSlaider.innerHTML += codHTML;
                break;
            case registroSlider[i].categoria == 'Disparos':
                codHTML = `
                <div class="carousel-item">
                    <img src="img/categorias/Disparos/${registroSlider[i].url}" class="d-block w-100" alt="acv">
                    <div class="carousel-caption d-none d-md-block">
                    </div>
                </div>`;
                imgSlaider.innerHTML += codHTML;
                break;
            case registroSlider[i].categoria == 'Carreras':
                codHTML = `
                <div class="carousel-item">
                    <img src="img/categorias/carreras/${registroSlider[i].url}" class="d-block w-100" alt="acv">
                    <div class="carousel-caption d-none d-md-block">
                    </div>
                </div>`;
                imgSlaider.innerHTML += codHTML;
                break;
            case registroSlider[i].categoria == 'Infantiles':
                codHTML = `
                <div class="carousel-item active">
                    <img src="img/categorias/Infantil/g${registroSlider[i].url}" class="d-block w-100" alt="acv">
                    <div class="carousel-caption d-none d-md-block">
                    </div>
                </div>`;
                imgSlaider.innerHTML += codHTML;
                
                break;
            default:
                alert("Error");
                break;
        }
    }
}


function cargarAdministradorDefecto(){
    let administrdor = new Usuario('Rosario', 'Serrano', 'admin1234', 'rserrano@gmail.com', 'Administrador');
    registroUsuarios = [administrdor]
    localStorage.setItem('Usuarios', JSON.stringify(registroUsuarios));
}
function cargarIndex(){
    leerLS();
    escribirIndex();
}

function escribirIndex(){
    //Aqui por cada categoria voy a tener que tener un id de la etiqueta padre, 
    //y en el switch ir escribiendo respecto a la categoria que pertenece
    let tbodyAccion = document.getElementById('filaAccion');
    let tbodyDisparos = document.getElementById('filaDisparo');
    let tbodyCarreras = document.getElementById('filaCarrera');
    let tbodyInfantiles = document.getElementById('filaInfantil');
    let codHtml = '';
    let juegoPublicados = registroJuegos.filter(function(item){
        return item.publicado == true;
    });  
    for(let i in juegoPublicados){
        switch(true){
            case juegoPublicados[i].categoria == 'Accion/Aventura':
                codHtml = 
                `<div class="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div class="card-deck darkgrey" id="">
                        <img class="card-img-top " alt="100x280" src="img/categorias/carreras/${juegoPublicados[i].url}">
                        <div class="card-body white-t" id="">
                            <h4 class="card-title">${juegoPublicados[i].nombre}</h4>
                            <h5 class="card-text"><strong> >> ${juegoPublicados[i].precio} US$</strong></h5>
                            <div class="container text-right mb-2">
                                <a href="detalle.html?Id=${juegoPublicados[i].codigo}" class="btn btn-dark mx-1 efectoimg black">Ver mas</a>
                                <a href="error404.html" class="btn btn-dark efectoimg orange" id="">Comprar</a>
                            </div>
                            <i class="fab fa-xbox mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-playstation mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-windows mx-1" style="color:#c7c7c7"></i>
                        </div>
                    </div>
                </div>`;
                tbodyAccion.innerHTML += codHtml;
                break;
            case juegoPublicados[i].categoria == 'Disparos':
                codHtml = `
                <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div class="card-deck darkgrey" id="">
                        <img class="card-img-top " alt="100x280" src="img/categorias/Disparos/${juegoPublicados[i].url}">
                        <div class="card-body white-t" id="">
                            <h4 class="card-title">${juegoPublicados[i].nombre}</h4>
                            <h5 class="card-text"><strong> >> ${juegoPublicados[i].precio} US$</strong></h5>
                            <div class="container text-right mb-2">
                                <a href="detalle.html?Id=${juegoPublicados[i].codigo}" class="btn btn-dark mx-1 efectoimg black">Ver mas</a>
                                <a href="error404.html" class="btn btn-dark efectoimg orange" id="">Comprar</a>
                            </div>
                            <i class="fab fa-xbox mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-playstation mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-windows mx-1" style="color:#c7c7c7"></i>
                        </div>
                    </div>
                </div>`;
                tbodyDisparos.innerHTML += codHtml;
                break;
            case juegoPublicados[i].categoria == 'Carreras':
                codHtml = `
                <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div class="card-deck darkgrey" id="">
                        <img class="card-img-top " alt="100x280" src="img/categorias/carreras/${juegoPublicados[i].url}">
                        <div class="card-body white-t" id="">
                            <h4 class="card-title">${juegoPublicados[i].nombre}</h4>
                            <h5 class="card-text"><strong> >> ${juegoPublicados[i].precio} US$</strong></h5>
                            <div class="container text-right mb-2">
                                <a href="detalle.html?Id=${juegoPublicados[i].codigo}" class="btn btn-dark mx-1 efectoimg black">Ver mas</a>
                                <a href="error404.html" class="btn btn-dark efectoimg orange" id="">Comprar</a>
                            </div>
                            <i class="fab fa-xbox mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-playstation mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-windows mx-1" style="color:#c7c7c7"></i>
                        </div>
                    </div>
                </div>`;
                tbodyCarreras.innerHTML += codHtml;
                break;
            case juegoPublicados[i].categoria == 'Infantiles':
                codHtml = `
                <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div class="card-deck darkgrey" id="">
                        <img class="card-img-top " alt="100x280" src="img/categorias/Infantil/${juegoPublicados[i].url}">
                        <div class="card-body white-t" id="">
                            <h4 class="card-title">${juegoPublicados[i].nombre}</h4>
                            <h5 class="card-text"><strong> >> ${juegoPublicados[i].precio} US$</strong></h5>
                            <div class="container text-right mb-2">
                                <a href="detalle.html?Id=${juegoPublicados[i].codigo}" class="btn btn-dark mx-1 efectoimg black">Ver mas</a>
                                <a href="error404.html" class="btn btn-dark efectoimg orange" id="">Comprar</a>
                            </div>
                            <i class="fab fa-xbox mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-playstation mx-1" style="color:#c7c7c7"></i>
                            <i class="fab fa-windows mx-1" style="color:#c7c7c7"></i>
                        </div>
                    </div>
                </div>`;
                tbodyInfantiles.innerHTML += codHtml;
                break;
            default:
                alert("Error");
                break;
        }
    }
}
