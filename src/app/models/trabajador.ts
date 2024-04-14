export class Trabajador{
    _id?: number;
    dni: string ;
    nombre: string;
    rol: string;
    estado: string;

    constructor(dni: string, nombre: string, rol: string, estado: string) {
        this.dni = dni
        this.nombre = nombre
        this.rol = rol
        this.estado = estado
    }
}