import Usuario from "./usuario";

export default class Cliente extends Usuario{
    constructor(nombre, apellido, contraseña, correo, tipo, estado){
        super(nombre, apellido, contraseña, correo, tipo);
        this.estado = estado;
    }
    get miEstado(){
        return this.estado;
    }
}