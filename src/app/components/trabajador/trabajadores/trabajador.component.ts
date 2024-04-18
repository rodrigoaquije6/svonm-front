import { Component } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador';
import { ToastrService } from 'ngx-toastr';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent {
  listTrabajador: Trabajador[] = [];

  constructor(private _trabajadorService: TrabajadorService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void { 
    this.obtenerTrabajador();
  }

  obtenerTrabajador() {
    this._trabajadorService.getTrabajador().subscribe(data => {
      console.log(data);
      this.listTrabajador = data;
    },error => {
      console.log(error);
    })
  }

  eliminarTrabajador(id: any){
    this._trabajadorService.eliminarTrabajador(id).subscribe(data =>{
      this.toastr.info('El trabajador fue eliminado con éxito!','Trabajador Eliminado!')
      this.obtenerTrabajador();
    },error =>{
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }

}
