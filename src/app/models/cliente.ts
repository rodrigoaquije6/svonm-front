export class Cliente{
    _id?: number;
    dni: string ;
    nombres: string;
    apellidos: string;
    celular: number;
    direccion: string;
    correo: string;
    estado: string;

    constructor(dni: string, nombres: string, apellidos: string, celular: number, direccion: string, correo: string, estado: string) {
        this.dni = dni
        this.nombres = nombres
        this.apellidos = apellidos
        this.celular = celular
        this.direccion = direccion
        this.correo = correo
        this.estado = estado
    }
}