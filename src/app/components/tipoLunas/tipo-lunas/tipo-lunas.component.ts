import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoLuna } from 'src/app/models/tipoLuna';
import { LoginService } from 'src/app/services/login.service';
import { TipoLunaService } from 'src/app/services/tipoLuna.service';

@Component({
  selector: 'app-tipo-lunas',
  templateUrl: './tipo-lunas.component.html',
  styleUrls: ['./tipo-lunas.component.css']
})
export class TipoLunasComponent {
  listTipoLuna: TipoLuna[] = [];

  constructor(private _tipoLunaService: TipoLunaService,
    private toastr: ToastrService,
    private api: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerTipoLunas();
  }

  obtenerTipoLunas() {
    this._tipoLunaService.getTipoLunas().subscribe(data => {
      console.log(data);
      this.listTipoLuna = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarTipoLunas(id: any) {
    this._tipoLunaService.eliminarTipoLuna(id).subscribe(data => {
      this.toastr.info('El tipo de luna fue eliminado con éxito!', 'Tipo de Luna Eliminado!')
      this.obtenerTipoLunas();
    }, error => {
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoLuna');
    this.router.navigate(['login']);
  }
}
