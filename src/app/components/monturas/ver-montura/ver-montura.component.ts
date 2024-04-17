import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Montura } from 'src/app/models/montura';
import { MonturaService } from 'src/app/services/montura.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ver-montura',
  templateUrl: './ver-montura.component.html',
  styleUrls: ['./ver-montura.component.css']
})
export class VerMonturaComponent implements OnInit {
  monturaForm: FormGroup;
  id: string | null;
  marca: any[] = [];
  url = 'http://localhost:4000/api/crear-marca/' //https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _monturaService: MonturaService,
    private aRouter: ActivatedRoute
  ) {
    this.monturaForm = this.fb.group({
      codigo: ['', Validators.required],
      marca: ['', Validators.required],
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }

  agregarMontura() {

    const MONTURA: Montura = {
      codigo: this.monturaForm.get('codigo')?.value,
      marca: this.monturaForm.get('marca')?.value,
      nombre: this.monturaForm.get('nombre')?.value,
      color: this.monturaForm.get('color')?.value,
      precio: this.monturaForm.get('precio')?.value,
      imagen: this.monturaForm.get('imagen')?.value,
    };

    console.log(MONTURA);
    this._monturaService.guardarMontura(MONTURA).subscribe(data => {
      this.toastr.success('La montura fue registrado con éxito!', 'Montura Registrado!');
      this.router.navigate(['/dashboard-gerente/montura']);
    }, error => {
      console.log(error);
      this.monturaForm.reset();
    })

  }

  obtenerMontura() {
    if (this.id !== null) {
      this._monturaService.obtenerMontura(this.id).subscribe(data => {
        this.monturaForm.setValue({
          codigo: data.codigo,
          marca: data.marca,
          nombre: data.nombre,
          color: data.color,
          precio: data.precio,
          imagen: data.imagen
        })
      })
    }
  }

}
