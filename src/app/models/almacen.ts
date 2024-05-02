export class Almacen {
    _id?: number;
    nombre : string;
    tipo : string;
    stock : number;

    constructor(nombre : string, tipo : string, stock : number){
        this.nombre = nombre;
        this.tipo = tipo;
        this.stock = stock;
    }
}