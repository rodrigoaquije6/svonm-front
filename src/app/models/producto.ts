import { Marca } from "./marca";
import { TipoProducto } from "./tipoProducto";

export class Producto {
    _id?: number;
    codigo: string;
    tipoProducto: TipoProducto;
    nombre: string;
    precio: number;
    imagen: string;
    marca: Marca;
    proveedor: string;
    stock: number;
    stockMinimo: number;
    estado: string;

    constructor(codigo: string, tipoProducto: TipoProducto, nombre: string, precio: number, imagen: string, marca: Marca, proveedor: string, stock: number, stockMinimo: number, estado: string) {
        this.codigo = codigo;
        this.tipoProducto = tipoProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.marca = marca;
        this.proveedor = proveedor;
        this.stock = stock;
        this.stockMinimo = stockMinimo;
        this.estado = estado;
    }
}