export class Ingreso {
    _id?: number;
    codigo: string;
    observacion: string;
    descuento?: number;
    impuesto?: number;
    subtotal: number;
    total: number;
    fechaEntregaEstimada: Date;
    estado: string;
    idProveedor: string;
    idTrabajador: string;

    constructor(codigo: string,
        observacion: string,
        descuento: number,
        impuesto: number,
        subtotal: number,
        total: number,
        fechaEntregaEstimada: Date,
        idProveedor: string,
        idTrabajador: string,
        estado: string,
    ) {
        this.codigo = codigo;
        this.observacion = observacion;
        this.descuento = descuento;
        this.impuesto = impuesto;
        this.subtotal = subtotal;
        this.total = total;
        this.estado = estado;
        this.fechaEntregaEstimada = fechaEntregaEstimada;
        this.idProveedor = idProveedor;
        this.idTrabajador = idTrabajador;
        this.estado = estado;
    }
}