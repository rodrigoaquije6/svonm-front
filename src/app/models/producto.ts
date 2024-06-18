export class Producto {
    _id?: number;
    codigo: string;
    tipoProducto: string;
    nombre: string;
    precio: number;
    imagen: string;
    marca: string;
    stock:number;
    stockMinimo:number;
    estado:string;
    
    constructor(codigo: string, tipoProducto: string, nombre: string, precio: number, imagen: string, marca: string, stock: number, stockMinimo:number, estado: string) {
        this.codigo = codigo;
        this.tipoProducto = tipoProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.marca = marca;
        this.stock = stock;
        this.stockMinimo = stockMinimo;
        this.estado = estado;
    }
}