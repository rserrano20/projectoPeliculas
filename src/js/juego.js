export default class Juego{
    constructor(codigo, nombre, categoria, descripcion, publicado, precio, url){
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.precio = precio;
        this.url = url;
    }
    get miCodigo(){
        return this.codigo;
    }
    get miNombre(){
        return this.nombre;
    }
    get miCategoria(){
        return this.categoria;
    }
    get miDescripcion(){
        return this.descripcion;
    }
    get miPublicado(){
        return this.publicado;
    }
    get miPrecio(){
        return this.precio;
    }
}