export class Trabajador{
    _id?: number;
    dni: number ;
    nombre: string;
    rol: string
    estado: boolean

    constructor(nombre: string, dni: number, rol: string, estado: boolean) {
        this.dni = dni
        this.nombre = nombre
        this.rol = rol
        this.estado = estado
    }
}