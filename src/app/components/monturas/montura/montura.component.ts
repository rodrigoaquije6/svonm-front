import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Montura } from 'src/app/models/montura';
import { MonturaService } from 'src/app/services/montura.service';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-montura',
  templateUrl: './montura.component.html',
  styleUrls: ['./montura.component.css']
})
export class MonturaComponent implements OnInit{
  listMontura: Montura[] = [];

  constructor(private _monturaService: MonturaService,
              private toastr: ToastrService,) { }

  ngOnInit(): void { 
    this.obtenerMonturas();
  }

  obtenerMonturas() {
    this._monturaService.getMontura().subscribe(data => {
      console.log(data);
      this.listMontura = data;
    },error => {
      console.log(error);
    })
  }

  eliminarMontura(id: any){
    this._monturaService.eliminarMontura(id).subscribe(data =>{
      this.toastr.info('La montura fue eliminada con éxito!','Montura Eliminada!')
      this.obtenerMonturas();
    },error =>{
      console.log(error);
    })
  }

}