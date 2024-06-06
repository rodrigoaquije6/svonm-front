export class Venta{
    _id?: number;
    precioLuna: number;
    precioMontura: number;
    precioTotal: number;
    A_Cuenta: number;
    Saldo: number;


    constructor(precioLuna: number, precioMontura: number, precioTotal: number, A_Cuenta: number, Saldo: number) {
        this.precioLuna = precioLuna
        this.precioMontura = precioMontura
        this.precioTotal = precioTotal
        this.A_Cuenta = A_Cuenta
        this.Saldo = Saldo       
    }
}