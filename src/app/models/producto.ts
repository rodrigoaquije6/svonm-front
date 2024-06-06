export class Producto {
    _id?: number;
    codigo: string;
    tipoProducto: string;
    nombre: string;
    precio: Number;
    imagen: string;
    marca: string;
    fechaCreacion: Date;

    constructor(codigo: string,
        tipoProducto: string,
        nombre: string,
        precio: Number,
        imagen: string,
        marca: string,
        fechaCreacion: Date) {
        this.nombre = nombre
        this.marca = marca
        this.precio = precio
        this.codigo = codigo
        this.imagen = imagen
        this.tipoProducto = tipoProducto
        this.fechaCreacion = fechaCreacion
    }
}