import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tratamiento } from 'src/app/models/tratamiento';
import { LoginService } from 'src/app/services/login.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css']
})
export class TratamientosComponent {
  listTratamieto: Tratamiento[] = [];

  constructor(private _tratamientoService: TratamientoService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerTratamientos();
  }

  obtenerTratamientos() {
    this._tratamientoService.getTratamientos().subscribe(data => {
      console.log(data);
      this.listTratamieto = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarTratamiento(id: any) {
    this._tratamientoService.eliminarTratamiento(id).subscribe(data => {
      this.toastr.info('El tratamiento fue eliminado con éxito!', 'Tratamiento Eliminado!')
      this.obtenerTratamientos();
    }, error => {
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tratamiento');
    this.router.navigate(['login']);
  }
}
