import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import 'popper.js'
import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/all.min.js'
import Usuario from './usuario.js';
import Juego from './juego.js';
import {revisar} from './registro.js';
import Swal from 'sweetalert2';


let registroUsuarios = [];
let registroJuegos = [];
let registroFavoritos = [];
let registroFavoritosN = [];

cargarTablas();

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
        registroUsuarios = JSON.parse(localStorage.getItem('Usuarios'));
        registroJuegos = JSON.parse(localStorage.getItem('Juegos'));
        registroUsuariosActivos = JSON.parse(localStorage.getItem('UsuariosActivos'));
        registroFavoritos = JSON.parse(localStorage.getItem('Favoritos'));
    }
    if(localStorage.getItem("Favoritos") === null){
        registroFavoritos = ["1","2","4"]
        localStorage.setItem('Favoritos', JSON.stringify(registroFavoritos));
    }else{
        localStorage.setItem('Favoritos', JSON.stringify(registroFavoritos));
    }
}

window.aprobarCliente = function(correo){
    leerLS();
    
    //Debemos seleccionar la linea del cliente que vamos a aprobar como hicimos con modificar en funkopop
    for(let i in registroUsuarios){
        if(registroUsuarios[i].correo == correo){
            //Cambiar el estado
            registroUsuarios[i].estado = 'Aprobado';
            break;
        }
    }
    //Guardar Cambios
    localStorage.setItem('Usuarios', JSON.stringify(registroUsuarios));
    //En el caso que quieramos mostrar solo los estados pendiente, hay que actualizar la tabla
    //O podemos mostrar todos los usuarios y agregarle un check a los que esten validados
    document.location.reload(true);
}

function cargarTablas(){
    leerLS();
    
    let bodyJuegos = document.getElementById('bodyJuego');
    let bodyCliente = document.getElementById('bodyCliente');
    registroUsuarios = registroUsuarios.filter(function(cliente){
        return cliente.tipo == 'Cliente' && cliente.estado == 'Pendiente';
    });
    let codHTML = '';
    let estado;
    let clase = "";
    let codFavorito;
    for(let i in registroJuegos){
        
        if(registroJuegos[i].publicado){
            estado = "SI";
        }else{
            estado = "NO";
        }
        codFavorito = registroFavoritos.find(function(item){
            if(registroJuegos[i].codigo == item){
                
                return item;
            }else{
                return null;
            }
        });
        
        if(codFavorito){
            clase = 'btn btn-warning';
        }else{
            clase = "btn btn-info";
        }
        codHTML=`
        <tr>
            <td>${registroJuegos[i].codigo}</td>
            <td>${registroJuegos[i].nombre}</td>
            <td>${registroJuegos[i].categoria}</td>
            <td>${registroJuegos[i].descripcion}</td>
            <td>${estado}</td>
            <td>${registroJuegos[i].precio}</td>
            <td>
                <button id="" class="btn btn-primary"><i class="far fa-edit"></i></button>
                <button id="${registroJuegos[i].codigo}" class="btn btn-danger" onclick="eliminarJuego(this)"><i class="far fa-trash-alt"></i></button> 
                <button class="${clase}" id="${registroJuegos[i].codigo}" onclick="juegoFavorito(this)"><i class="far fa-star"></i></button>
            </td>
        </tr>`;
        bodyJuegos.innerHTML += codHTML; 
    }
    /* <button class="btn btn-primary"><i class="far fa-star"></i></button>  */
    codHTML = '';
    for(let i in registroUsuarios){
        codHTML = `
        <tr>
            <td>${registroUsuarios[i].nombre}</td>
            <td>${registroUsuarios[i].apellido}</td>
            <td>${registroUsuarios[i].correo}</td>
            <td>${registroUsuarios[i].estado}</td>
            <td>
                <button id="${registroUsuarios[i].correo}" class="btn btn-primary" onclick="aprobarCliente(this.id)"><i class="far fa-check-square"></i></button>       
            </td>
        </tr>`;
        bodyCliente.innerHTML += codHTML;
    }

}
function nuevoAdminitrador(){
    let admin = new Usuario(document.getElementById('').value, document.getElementById('').value, document.getElementById('').value, document.getElementById('').value, 'Administrador');
    
    leerLS();
    registroUsuarios.push(admin);
    localStorage.setItem('Usuarios', JSON.stringify(registroUsuarios));
    alert("Administrador agregado con Exito!");
}

window.juegoFavorito = function(buttonJuego){
    leerLS();
    let codigo = ""
    registroFavoritosN = [];
    
    for(let i in registroFavoritos){
        if(registroFavoritos[i]==buttonJuego.id){
            codigo = null;
            break;
        }
    }
    
    if(codigo != null){ //no esta en registroFavorito asi q debo agregarlo
        registroFavoritos.push(buttonJuego.id);
        localStorage.setItem('Favoritos', JSON.stringify(registroFavoritos));
    }else{ //Si esta, asi q debo sacarlo
        for(let i in registroFavoritos){
            if(registroFavoritos[i] != buttonJuego.id){
                registroFavoritosN.push(registroFavoritos[i]);
            }
        }
        
        localStorage.setItem('Favoritos', JSON.stringify(registroFavoritosN));
    }
    document.location.reload(true);
    /* limpiarTabla();
    cargarTablas(); */
}





window.eliminarCliente=function(cliente){
    Swal.fire({
		title: 'Esta seguro de eliminar este Cliente?',
		text: "No puedes volver esta operacion atras",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Borrar'
	  }).then((result) => {
		if (result.value) {
            
            leerLS;
			registroUsuarios = registroUsuarios.filter(function(item) {
				return item.correo != cliente.correo;
			});
		
			localStorage.setItem('Juegos', JSON.stringify(registroUsuarios));
			leerLS;
			

		  Swal.fire(
			'Producto eliminado',
			'El producto fue eliminado satisfactoriamente',
			'success'
		  )
		}
	  })
}

//con preModificarCliente vamos a cargar los datos en pantalla
window.preModificarCliente=function(correoCliente){
    leerLS();
    //Usare filter para filtrar primero a los clientes unicamente
    registroUsuarios = registroUsuarios.filter(function(item){
        return item.tipo == 'Cliente';
    });
    //Ahora busco en la lista con solo clientes
    let clienteEncontrado = registroUsuarios.find(function(cliente){
        return cliente.correo == correoCliente;
    });
    
    document.getElementById('').value = clienteEncontrado.nombre;
    document.getElementById('').value = clienteEncontrado.apellido;
    document.getElementById('').value = clienteEncontrado.contraseña;
    document.getElementById('').value = clienteEncontrado.correo;
    document.getElementById('').value = clienteEncontrado.tipo;
    document.getElementById('').value = clienteEncontrado.estado;
    
    //Usar bandera
}


//Con una bandera en agregarUsuario, deberia llamarse a esta funcion
function modificarCliente(){
    let cliente = new Cliente(document.getElementById('').value, document.getElementById('').value, 
    document.getElementById('').value, document.getElementById('').value, document.getElementById('').value, 
    document.getElementById('').value);

    //Actualizar registroUsuarios
    for(let i in registroUsuarios){
        if(registroUsuarios[i]== cliente.correo){
            //Aqui debo preguntar si no existe ya este cliente por el hecho que lo tomaremos como identificador unico que es el correo
            //Debo tener en cuenta los permisos a la hora de modificar, capas que un cliente puede modificarse el estado
            registroUsuarios[i].nombre = cliente.nombre;
            registroUsuarios[i].apellido = cliente.apellido;
            registroUsuarios[i].contraseña = cliente.contraseña;
            registroUsuarios[i].correo = cliente.correo;
            registroUsuarios[i].tipo = cliente.tipo;
            registroUsuarios[i].estado = cliente.estado;
            break;
        }
    }
    localStorage.setItem('Usuarios', JSON.stringify(registroUsuarios));

}
//VALIDACION DE JUEGO codigo, nombre, categoria, descripcion, publicado, precio, url
window.validarFormJuego = function(e){
    e.preventDefault();
    
    //Poner los campos que sean obligatorios!
    if(revisarCodigo(document.getElementById('codigo')) && revisar(document.getElementById('nombre')) && revisar(document.getElementById('categoria')) && revisar(document.getElementById('descripcion')) &&revisar(document.getElementById('publicado')) && revisar(document.getElementById('precio'))){
        nuevoJuego();
    }/* else{
        alert("Error al ingresar los datos!");
    } */
}
function revisarCodigo(codigo){
    if(codigo.value != ""){
        let juegoEncontrado /* = registroJuegos.find(function(item){
            return item.codigo == codigo.value;
        }) */
        for(let i in registroJuegos){
            if(registroJuegos[i].codigo == codigo.value){
                juegoEncontrado = null;
            }
        }
        if(juegoEncontrado != null){
            codigo.className = "form-control is-invalid";
            return false;
        }else{
            return true;
        }
    }else{
        codigo.className = "form-control is-valid";
        return false;
    }
}
function nuevoJuego(){
                        //Falta agregar el atributo de URL y preguntar si son mas de uno, xq es un array la propiedad
    let juego = new Juego(document.getElementById('codigo').value, document.getElementById('nombre').value, document.getElementById('categoria').value, 
    document.getElementById('descripcion').value, document.getElementById('publicado').value, document.getElementById('precio').value);
    let ventanaModal = document.getElementById('exampleModal');
    
    registroJuegos.push(juego);
    localStorage.setItem('Juegos', JSON.stringify(registroJuegos));
    $(ventanaModal).modal('hide');
    Swal.fire(
        'Operacion Exitosa',
        'Se agrego un nuevo juego al catalogo',
        'success'
    );
    alert("Esperar");
    document.location.reload(true);
}

function juegoExistente(codigo){
    leerLS();
    let juegoEncontrado = registroJuegos.find(function(juego){
        return juego.codigo == codigo
    })
    return juegoEncontrado;
}

window.eliminarJuego = function(juego){
    Swal.fire({
		title: 'Esta seguro de eliminar el juego?',
		text: "No puedes volver esta operacion atras",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Borrar'
	  }).then((result) => {
		if (result.value) {
            
            leerLS;
			registroJuegos = registroJuegos.filter(function(item) {
				return item.codigo != juego.id;
			});
		
			localStorage.setItem('Juegos', JSON.stringify(registroJuegos));
			leerLS;
			document.location.reload(true);

		  Swal.fire(
			'Producto eliminado',
			'El producto fue eliminado satisfactoriamente',
			'success'
		  )
		}
	  });
} 

//con preModificarJuego vamos a cargar los datos en pantalla
window.preModificarJuego = function(codigoJuego){
    leerLS(); //Para refrescar la lista de registroJuegos[]; 
                                                                        //Tener en cuenta un modal si vamos a trabajar con el
    /* let modalJuego = document.getElementById(''); */
    
    
    let juegoEncontrado = registroJuegos.find(function(juego){
        return juego.codigo == codigoJuego;
    });
    
    //Debo cargar en el modal los datos a ser modificado
    document.getElementById('').value = juegoEncontrado.codigo;
    document.getElementById('').value = juegoEncontrado.nombre;
    document.getElementById('').value = juegoEncontrado.categoria;
    document.getElementById('').value = juegoEncontrado.descripcion;
    document.getElementById('').value = juegoEncontrado.publicado;
    document.getElementById('').value = juegoEncontrado.precio;
    document.getElementById('').value = juegoEncontrado.url;            //Aqui habra que recorrer url por las dudas tenga mas imagenes un juego

                                                                        //Si vamos a reutilizar el modal de agregar Producto, debemos trabajar con bandera
    /* let banderaJuego = true; */                                            //Esto debe ir declarado de manera global si lo utilzaremos
    /* $(modalJuego).modal('show'); */  //mostramos el modal

}

//Con una bandera en agregarJuego, deberia llamarse a esta funcion
function modificarJuego(){
     //Si vamos a tener en cuenta que puede agregar mas de una URL de imagen/video hay q modificar el parametro de juego y pasar un array
    let juego = new Juego(document.getElementById('').value, document.getElementById('').value, 
    document.getElementById('').value, document.getElementById('').value, document.getElementById('').value, 
    document.getElementById('').value, document.getElementById('').value);
    //Actualizar registroJuegos
    for(let i in registroJuegos){
        if(registroJuegos[i].codigo == juego.codigo){
            //Aqui debo preguntar si no existe ya este juego por el hecho que lo tomaremos como identificador unico
            registroJuegos[i].codigo = juego.codigo;
            registroJuegos[i].nombre = juego.nombre;
            registroJuegos[i].categoria = juego.categoria;
            registroJuegos[i].descripcion = juego.descripcion;
            registroJuegos[i].publicado = juego.publicado;
            registroJuegos[i].precio = juego.precio;
            registroJuegos[i].url = juego.url;
            break;
        }
    }
    //Actualizare el LS
    localStorage.setItem('Juegos', JSON.stringify(registroJuegos));

    //Cerrar el modal si usaremos
}
