export class Producto {
    _id?: number;
    codigo: string;
    tipoProducto: string;
    nombre: string;
    precio: number;
    imagen: string;
    marca: string;

    constructor(codigo: string, tipoProducto: string, nombre: string, precio: number, imagen: string, marca: string) {
        this.codigo = codigo;
        this.tipoProducto = tipoProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.marca = marca;
    }
}