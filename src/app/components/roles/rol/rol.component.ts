import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { RolService } from 'src/app/services/rol.service';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  listRoles: Rol[] = [];

  constructor(private _rolService: RolService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this._rolService.getRoles().subscribe(data => {
      console.log(data);
      this.listRoles = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarRol(id: any) {
    this._rolService.eliminarRol(id).subscribe(data => {
      this.toastr.info('El rol fue eliminado con éxito!', 'Rol Eliminado!')
      this.obtenerRoles();
    }, error => {
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
