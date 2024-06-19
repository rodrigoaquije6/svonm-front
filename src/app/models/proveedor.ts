export class Proveedor{
    _id?: number;
    ruc: number ;
    nombre: string;
    nombreContacto: string;
    apellidoContacto: string;
    telefono: number;
    direccion: string;
    correo: string;
    estado: string;

    constructor(ruc: number, nombre: string, nombreContacto: string, apellidoContacto: string, telefono: number, direccion: string, correo: string, estado: string) {
        this.ruc = ruc
        this.nombre = nombre
        this.nombreContacto = nombreContacto
        this.apellidoContacto = apellidoContacto
        this.telefono = telefono
        this.direccion = direccion
        this.correo = correo
        this.estado = estado
    }
}