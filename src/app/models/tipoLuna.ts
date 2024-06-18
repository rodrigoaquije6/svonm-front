export class TipoLuna {
    _id?: number;
    nombre: string;
    precio: number;
    estado: string;

    constructor(nombre: string, precio: number, estado: string) {
        this.nombre = nombre;
        this.precio = precio;
        this.estado = estado;
    }
}