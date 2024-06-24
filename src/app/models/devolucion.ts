export class Devolucion {
    _id?: number;
    codigo: string;
    motivo: string;
    observacion: string;
    total: number;
    idVenta: string;

    constructor(codigo: string,
        motivo: string,
        observacion:string,
        total: number,
        idVenta: string,
    ) {
        this.codigo = codigo;
        this.motivo = motivo;
        this.observacion = observacion;
        this.total = total;
        this.idVenta = idVenta;
    }
}