import { Component } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador';
import { ToastrService } from 'ngx-toastr';
import { TrabajadorService } from 'src/app/services/trabajador.service';
@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent {
  listTrabajador: Trabajador[] = [];

  constructor(private _trabajadorService: TrabajadorService,
              private toastr: ToastrService,) { }

  ngOnInit(): void { 
    this.obtenerTrabajador();
  }

  obtenerTrabajador() {
    this._trabajadorService.getTrabajador().subscribe(data => {
      console.log(data);
      this.listTrabajador = data;
    },error => {
      console.log(error);
    })
  }

  eliminarTrabajador(id: any){
    this._trabajadorService.eliminarTrabajador(id).subscribe(data =>{
      this.toastr.error('El trabajador fue eliminado con éxito!','Producto Eliminado!')
      this.obtenerTrabajador();
    },error =>{
      console.log(error);
    })
  }
}
