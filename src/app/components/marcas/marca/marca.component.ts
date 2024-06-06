import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/marca';
import { Router } from '@angular/router';
import { MarcaService } from 'src/app/services/marca.service';
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  listMarcas : Marca [] = [];

  constructor(private _crearmarcaService:MarcaService, 
              private toastr: ToastrService,
              private api: LoginService, 
              private router: Router) {}

  ngOnInit(): void{
    this.obtenerMarcas();
  }

  obtenerMarcas() {
    this._crearmarcaService.getMarcas().subscribe(data =>{
      console.log(data);
      this.listMarcas = data;
    },error => {
      console.log(error);
    })
  }

  eliminarMarca(id: any){

    this._crearmarcaService.eliminarMarca(id).subscribe(data => {
      this.toastr.info('La marca fue eliminada con éxito!','Marca Eliminada!');
      this.obtenerMarcas();
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