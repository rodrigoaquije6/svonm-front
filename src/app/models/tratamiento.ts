export class Tratamiento {
    _id?: number;
    nombre: string;
    precio: Number;

    constructor(
        nombre: string,
        precio: Number) {
        this.nombre = nombre
        this.precio = precio
    }
}