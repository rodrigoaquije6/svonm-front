export class Producto {
    _id?: number;
    codigo: string;
    tipoProducto: string;
    nombre: string;
    precio: number;
    imagen: string;
    marca: string;
    estado:string;

    constructor(codigo: string, tipoProducto: string, nombre: string, precio: number, imagen: string, marca: string, estado: string) {
        this.codigo = codigo;
        this.tipoProducto = tipoProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.marca = marca;
        this.estado = estado;
    }
}