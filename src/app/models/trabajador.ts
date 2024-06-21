export class Trabajador{
    _id?: number;
    user_dni: string;
      role: string;
      pnombre: string;
      snombre:string;
      apellidop: string;
      apellidom: string;
      username: string;
      password: string;
      celular: string;
      fecha_nac: string;
      email: string;
      isActive: boolean;

    constructor(user_dni: string,
        role: string,
        pnombre: string,
        snombre:string,
        apellidop: string,
        apellidom: string,
        username: string,
        password: string,
        celular: string,
        fecha_nac: string,
        email: string,
        isActive: boolean,) {
            this.user_dni = user_dni,
            this.role = role,
            this.pnombre = pnombre,
            this.snombre = snombre,
            this.apellidop = apellidop,
            this.apellidom = apellidom,
            this.username = username,
            this.password = password,
            this.celular = celular,
            this.fecha_nac = fecha_nac,
            this.email = email,
            this.isActive = isActive
    }
}