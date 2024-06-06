import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { Luna } from 'src/app/models/luna';
import { LunaService } from 'src/app/services/luna.service';
import { NombreLuna } from 'src/app/models/luna';


declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-luna',
  templateUrl: './luna.component.html',
  styleUrls: ['./luna.component.css']
})
export class LunaComponent implements OnInit {
  listLunas: Luna[] = [];
  listNombreLuna: NombreLuna[] = [];

  constructor(private _lunaService: LunaService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerLunas()
    this.obtenerNombreLuna();
  }

  obtenerLunas() {
    this._lunaService.getLunas().subscribe(data => {
      console.log(data);
      this.listLunas = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarLuna(id: any) {
    this._lunaService.eliminarLuna(id).subscribe(data => {
      this.toastr.info('La luna fue eliminada con éxito!', 'Luna Eliminada!')
      this.obtenerLunas();
    }, error => {
      console.log(error);
    })
  
  }

  obtenerNombreLuna() {
    this._lunaService.getNombreLuna().subscribe(data => {
      console.log(data);
      this.listNombreLuna = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarNombreLuna(id: any) {
    this._lunaService.eliminarNombreLuna(id).subscribe(data => {
      this.toastr.info('El Nombre luna fue eliminada con éxito!', 'Nombre luna Eliminada!')
      this.obtenerNombreLuna();
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
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
