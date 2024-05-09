import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { Almacen } from 'src/app/models/almacen';
import { AlmacenService} from 'src/app/services/almacen.service';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit{
  listAlmacen: Almacen[] = [];

  constructor(private _almacenService: AlmacenService,
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) { }

  ngOnInit(): void {
    //lista de prueba
    this.listAlmacen=[
       {_id:1, codigo:"0AN7237U",nombre:"Arnette A-Volution", tipo:"Lentes de sol", stock:15},
       {_id:2, codigo:"0AN7241U",nombre:"Arnette A.T.", tipo:"Lentes", stock:8},
       {_id:3, codigo:"0OX5076",nombre:"OakleySway Bar 0.5", tipo:"Lentes de sol Negros", stock:10}
    ]
  }

  obtenerAlmacen() {
    this._almacenService.getAlmacen().subscribe(data => {
      console.log(data);
      this.listAlmacen = data;
    }, error => {
      console.log(error);
    })
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('almacen');
    this.router.navigate(['login']);
  }
}
