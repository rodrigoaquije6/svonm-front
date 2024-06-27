export class Trabajador {
    _id?: number;
    user_dni: string;
    role: string;
    nombres: string;
    apellidos: string;
    password: string;
    celular: string;
    fecha_nac: Date;
    email: string;
    isActive: boolean;

    constructor(
        user_dni: string,
        role: string,
        nombres: string,
        apellidos: string,
        password: string,
        celular: string,
        fecha_nac: Date,
        email: string,
        isActive: boolean
    ) {
        this.user_dni = user_dni;
        this.role = role;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.password = password;
        this.celular = celular;
        this.fecha_nac = fecha_nac;
        this.email = email;
        this.isActive = isActive;
    }
}