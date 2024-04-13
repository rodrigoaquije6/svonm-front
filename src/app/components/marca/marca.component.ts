import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  listMarcas : marca [] = [];

  constructor(private _crearmarcaService:MarcaService, 
    private toastr: ToastrService) {}

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
      this.toastr.error('La marca fue eliminada con éxito','Marca eliminada');
    },error =>{
      console.log(error);
    }
  )

  }

}