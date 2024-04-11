export class Trabajador{
    _id?: number;
    dni: string ;
    nombre: string;
    rol: string;
    estado: boolean;

    constructor(dni: string, nombre: string, rol: string, estado: boolean) {
        this.dni = dni
        this.nombre = nombre
        this.rol = rol
        this.estado = estado
    }
}