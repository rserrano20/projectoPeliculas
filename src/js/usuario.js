export default class Usuario{
    constructor(nombre, apellido, contraseña, correo, tipo){
        this.nombre = nombre;
        this.apellido = apellido;
        this.contraseña = contraseña;
        this.correo = correo;
        this.tipo = tipo;
    }
    get miNombre(){
        return this.nombre;
    }
    get miApellido(){
        return this.apellido;
    }
    get miContraseña(){
        return this.contraseña;
    }
    get miCorreo(){
        return this.correo;
    }
    get miTipo(){
        return this.tipo;
    }

}
