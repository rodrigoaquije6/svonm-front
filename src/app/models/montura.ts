export class Montura{
    _id?: number;
    nombre: string;
    marca: string;
    color: string;
    precio: number;
    codigo: number;

    constructor(nombre: string, marca: string,  color: string, precio: number, codigo: number) {
        this.nombre = nombre
        this.marca = marca
        this.color = color
        this.precio = precio
        this.codigo = codigo

    }

}