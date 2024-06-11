export class DetalleVenta {
    _id?: number;
    cantidad: number;
    total: number;
    idVenta: string;
    idProducto: string;

    constructor(cantidad: number, total: number, idVenta: string, idProducto: string) {
        this.cantidad = cantidad;
        this.total = total;
        this.idVenta = idVenta;
        this.idProducto = idProducto;
    }
}