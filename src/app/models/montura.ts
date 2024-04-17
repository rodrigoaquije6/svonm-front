export class Montura{
    _id?: number;
    nombre: string;
    marca: string;
    color: string;
    precio: number;
    codigo: number;
    imagen: string;

    constructor(nombre: string, marca: string,  color: string, precio: number, codigo: number, imagen: string) {
        this.nombre = nombre
        this.marca = marca
        this.color = color
        this.precio = precio
        this.codigo = codigo
        this.imagen = imagen
    }
}