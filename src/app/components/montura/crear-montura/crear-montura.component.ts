import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Montura } from 'src/app/models/montura';
import { MonturaService } from 'src/app/services/montura.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-crear-montura',
  templateUrl: './crear-montura.component.html',
  styleUrls: ['./crear-montura.component.css']
})
export class CrearMonturaComponent implements OnInit {
  monturaForm: FormGroup;
  marca: any[] = [];
  url = 'http://localhost:4000/api/marca/' //https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _monturaService: MonturaService, 
    private http:HttpClient
){ 
  this.monturaForm = this.fb.group({
      codigo: ['', Validators.required],
      marca: ['', Validators.required],
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarMontura() {

    const MONTURA: Montura = {
      nombre: this.monturaForm.get('nombre')?.value,
      marca: this.monturaForm.get('marca')?.value,
      color: this.monturaForm.get('color')?.value,
      precio: this.monturaForm.get('precio')?.value,
      codigo: this.monturaForm.get('codigo')?.value,
    };

    console.log(MONTURA);
      this.toastr.success('La montura fue registrado con éxito!', 'Montura Registrado!');
      this.router.navigate(['/dashboard-gerente/montura']);
  }

}
