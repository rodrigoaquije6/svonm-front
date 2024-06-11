export class Venta {
    _id?: number;
    codigo: string;
  oDEsfera?: string;
  oDCilindro?: string;
  oDEje?: string;
  oDAvLejos?: string;
  oDAvCerca?: string;
  oDAdd?: number;
  oDAltura?: number;
  oDCurva?: number;
  oIEsfera?: string;
  oICilindro?: string;
  oIEje?: string;
  oIAvLejos?: string;
  oIAvCerca?: string;
  oIAdd?: number;
  oIAltura?: number;
  oICurva?: number;
  dipLejos?: number;
  dipCerca?: number;
  observacion: string;
  aCuenta: number;
  saldo: number;
  total: number;
  estado?: string;
  idCliente: string;
  idTrabajador: string;
  idTipoLuna?: string;
  idMaterialLuna?: string;

  constructor(codigo: string,
    observacion: string,
    aCuenta: number,
    saldo: number,
    total: number,
    idCliente: string,
    idTrabajador: string,
    oDEsfera?: string,
    oDCilindro?: string,
    oDEje?: string,
    oDAvLejos?: string,
    oDAvCerca?: string,
    oDAdd?: number,
    oDAltura?: number,
    oDCurva?: number,
    oIEsfera?: string,
    oICilindro?: string,
    oIEje?: string,
    oIAvLejos?: string,
    oIAvCerca?: string,
    oIAdd?: number,
    oIAltura?: number,
    oICurva?: number,
    dipLejos?: number,
    dipCerca?: number,
    estado?: string,
    idTipoLuna?: string,
    idMaterialLuna?: string
  ) {
    this.codigo = codigo;
    this.oDEsfera = oDEsfera;
    this.oDCilindro = oDCilindro;
    this.oDEje = oDEje;
    this.oDAvLejos = oDAvLejos;
    this.oDAvCerca = oDAvCerca;
    this.oDAdd = oDAdd;
    this.oDAltura = oDAltura;
    this.oDCurva = oDCurva;
    this.oIEsfera = oIEsfera;
    this.oICilindro = oICilindro;
    this.oIEje = oIEje;
    this.oIAvLejos = oIAvLejos;
    this.oIAvCerca = oIAvCerca;
    this.oIAdd = oIAdd;
    this.oIAltura = oIAltura;
    this.oICurva = oICurva;
    this.dipLejos = dipLejos;
    this.dipCerca = dipCerca;
    this.observacion = observacion;
    this.aCuenta = aCuenta;
    this.saldo = saldo;
    this.total = total;
    this.estado = estado;
    this.idCliente = idCliente;
    this.idTrabajador = idTrabajador;
    this.idTipoLuna = idTipoLuna;
    this.idMaterialLuna = idMaterialLuna;
  }
}