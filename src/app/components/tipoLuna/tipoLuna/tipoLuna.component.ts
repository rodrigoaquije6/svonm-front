import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoLuna } from 'src/app/models/tipoLuna';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { TipoLunaService } from 'src/app/services/tipoLuna.service';

@Component({
  selector: 'app-tipo-luna',
  templateUrl: './tipoLuna.component.html',
  styleUrls: ['./tipoLuna.component.css']
})
export class TipoLunaComponent {
  listTipoLuna: TipoLuna[] = [];

  constructor(private _tipoLunaService: TipoLunaService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void {
    this.obternerTipoluna();
  }

  obternerTipoluna() {
    this._tipoLunaService.getTipoLunas().subscribe(data => {
      console.log(data);
      this.listTipoLuna = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarTipoluna(id: any) {
    this._tipoLunaService.eliminarTipoLuna(id).subscribe(data => {
      this.toastr.info('El tipo de luna fue eliminado con éxito!', 'Tipo de luna Eliminado!')
      this.obternerTipoluna();
    }, error => {
      console.log(error);
    })
  }

  //Enzo: eestos metodos los he copiado del dashboard gerente, yo recomendaria isntaurar algo asi como un header
  //cosa que no sea necesario es5tar coipiando este codiggo en todos los componentes
  //y uno se pueda deloguear desde cualqueir lado, de otra manera este codigo entra que estar presente en todas las pantallas 
  //desde las cuales uno quiera ser capaz de desloguearse, el código HTML que usa la función onClickLogout()
  //tendra que copiarse también

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tipoLuna');
    this.router.navigate(['login']);
  }

}
