export class GestionarProducto{
    _id?: number;
    codigo: string;
    tipoProducto: string;
    nombre: string;
    precio: number;
    imagen: string;

    constructor(codigo: string, tipoProducto: string, nombre: string, precio: number, imagen: string) {
        this.codigo = codigo
        this.tipoProducto = tipoProducto
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}