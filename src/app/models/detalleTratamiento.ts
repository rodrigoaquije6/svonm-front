export class DetalleTratamiento {
    _id?: number;
    idTratamiento: string;
    idVenta: string;


    constructor(idTratamiento: string, idVenta: string) {
        this.idTratamiento = idTratamiento;
        this.idVenta = idVenta;
    }
}