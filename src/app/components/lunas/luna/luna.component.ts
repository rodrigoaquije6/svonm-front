import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { Luna } from 'src/app/models/luna';
import { LunaService } from 'src/app/services/luna.service';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-luna',
  templateUrl: './luna.component.html',
  styleUrls: ['./luna.component.css']
})
export class LunaComponent implements OnInit {
  listLunas: Luna[] = [];

  constructor(private _lunaService: LunaService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerLunas();
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

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('luna');
    this.router.navigate(['login']);
  }
}
