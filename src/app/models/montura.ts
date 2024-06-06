export class Montura {
    _id?: number;
    codigo: number;
    marca: string;
    nombre: string;
    color: string;
    género: string;
    precio: number;
    forma: string;
    imagen: string;

    constructor(nombre: string, marca: string, color: string, género: string, precio: number, forma: string, codigo: number, imagen: string) {
        this.nombre = nombre
        this.marca = marca
        this.color = color
        this.género = género
        this.precio = precio
        this.forma = forma
        this.codigo = codigo
        this.imagen = imagen
    }
}