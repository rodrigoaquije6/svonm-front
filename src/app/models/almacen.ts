export class Almacen {
    _id?: number;
    codigo: string;
    nombre : string;
    tipo : string;
    stock : number;

    constructor(nombre : string, tipo : string, stock : number, codigo:string){
        this.nombre = nombre;
        this.tipo = tipo;
        this.stock = stock;
        this.codigo=codigo;
    }
}