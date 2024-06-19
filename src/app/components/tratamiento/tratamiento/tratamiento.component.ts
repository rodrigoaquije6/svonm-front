import { Component } from '@angular/core';
import { Tratamiento } from 'src/app/models/tratamiento';
import { ToastrService } from 'ngx-toastr';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent {
  listTratamiento: Tratamiento[] = [];

  constructor(private _tratamientoService: TratamientoService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void { 
    this.obtenerTratamiento();
  }

  obtenerTratamiento() {
    this._tratamientoService.getTratamientos().subscribe(data => {
      console.log(data);
      this.listTratamiento = data;
    },error => {
      console.log(error);
    })
  }

  eliminarTratamiento(id: any){
    this._tratamientoService.eliminarTratamiento(id).subscribe(data =>{
      this.toastr.info('El tratamiento fue eliminado con éxito!','Tratamiento Eliminado!')
      this.obtenerTratamiento();
    },error =>{
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tratamiento');
    this.router.navigate(['login']);
  }

}
