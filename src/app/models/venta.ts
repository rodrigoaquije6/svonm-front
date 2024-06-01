import { Producto } from "./producto";
import { Tratamiento } from "./tratamiento";

export class Venta {
    _id?: number;
    nombreCliente:string;
    fechaVenta:string;
    celCliente:string;
    dirCliente:string;
    fijCliente:string;
    corrCliente:string;
    odEsfera:string;
    odCilindro:string;
    odEje:string;
    odAVLejos:string;
    odAVCerca:string;
    oiEsfera:string;
    oiCilindro:string;
    oiEje:string;
    oiAVLejos:string;
    oiAVCerca:string;
    odAdd:string;
    odAltura:string;
    odCurva:string;
    oiAdd:string;
    oiAltura:string;
    oiCurva:string;
    DipLejos:string;
    DipCerca:string;
    observaciones:string;
    optometra:string;
    fechaEntrega:string;
    vendedor:string;
    total:string;
    acuenta:string;
    saldo:string;
    tipoLuna:string;
    matLuna:string;
    conSeguimiento:boolean;
    tratamientos:Tratamiento[];
    productos:Producto[];

    constructor(nombreCliente:string,
        fechaVenta:string,
        celCliente:string,
        dirCliente:string,
        fijCliente:string,
        corrCliente:string,
        odEsfera:string,
        odCilindro:string,
        odEje:string,
        odAVLejos:string,
        odAVCerca:string,
        oiEsfera:string,
        oiCilindro:string,
        oiEje:string,
        oiAVLejos:string,
        oiAVCerca:string,
        odAdd:string,
        odAltura:string,
        odCurva:string,
        oiAdd:string,
        oiAltura:string,
        oiCurva:string,
        DipLejos:string,
        DipCerca:string,
        observaciones:string,
        optometra:string,
        fechaEntrega:string,
        vendedor:string,
        total:string,
        acuenta:string,
        saldo:string,
        tipoLuna:string,
        matLuna:string,
        conSeguimiento:boolean,
        tratamientos:Tratamiento[],
        productos:Producto[]) {
            this.nombreCliente = nombreCliente,
            this.fechaVenta = fechaVenta,
            this.celCliente = celCliente,
            this.dirCliente = dirCliente,
            this.fijCliente = fijCliente,
            this.corrCliente = corrCliente,
            this.odEsfera = odEsfera,
            this.odCilindro = odCilindro,
            this.odEje = odEje,
            this.odAVLejos = odAVLejos,
            this.odAVCerca = odAVCerca,
            this.oiEsfera = oiEsfera,
            this.oiCilindro = oiCilindro,
            this.oiEje = oiEje,
            this.oiAVLejos = oiAVLejos,
            this.oiAVCerca = oiAVCerca,
            this.odAdd = odAdd,
            this.odAltura = odAltura,
            this.odCurva = odCurva,
            this.oiAdd = oiAdd,
            this.oiAltura = oiAltura,
            this.oiCurva = oiCurva,
            this.DipLejos = DipLejos,
            this.DipCerca = DipCerca,
            this.observaciones = observaciones,
            this.optometra = optometra,
            this.fechaEntrega = fechaEntrega,
            this.vendedor = vendedor,
            this.total = total,
            this.acuenta = acuenta,
            this.saldo = saldo,
            this.tipoLuna = tipoLuna,
            this.matLuna = matLuna,
            this.conSeguimiento = conSeguimiento,
            this.tratamientos = tratamientos,
            this.productos = productos
    }
}