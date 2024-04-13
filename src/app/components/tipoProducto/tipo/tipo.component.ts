import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit{
  listTipo: TipoProducto[] = [];

  constructor(private _tipoProductoService: TipoProductoService,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.obtenerTipoP();    
  }

  obtenerTipoP(){
    this._tipoProductoService.getTipoProducto().subscribe(data => {
      console.log(data);
      this.listTipo = data;
    },error => {
      console.log(error);
    })
  }

  eliminarTipoProducto(id: any){
    this._tipoProductoService.eliminarTipoProducto(id).subscribe(data =>{
      this.toastr.error('El tipo de producto fue eliminado con éxito!','Tipo de producto Eliminado!')
      this.obtenerTipoP();
    },error =>{
      console.log(error);
    })
  }

}
