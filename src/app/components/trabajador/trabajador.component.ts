import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Trabajador } from 'src/app/models/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit{
  listTrabajadores: Trabajador[] = [];

  constructor(private _trabajadorService: TrabajadorService,
              private toastr: ToastrService,) { }

  ngOnInit(): void { 
    this.obtenerTrabajadores();
  }

  obtenerTrabajadores() {
    this._trabajadorService.getTrabajadores().subscribe(data => {
      console.log(data);
      this.listTrabajadores = data;
    },error => {
      console.log(error);
    })
  }

  eliminarTrabajadores(id: any){
    this._trabajadorService.eliminarTrabajadores(id).subscribe(data =>{
      this.toastr.error('El Trabajador fue eliminado con éxito!','Producto Eliminado!')
      this.obtenerTrabajadores();
    },error =>{
      console.log(error);
    })
  }

}

