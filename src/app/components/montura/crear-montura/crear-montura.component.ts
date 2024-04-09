import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Montura } from 'src/app/models/montura';
import { MonturaService } from 'src/app/services/montura.service';



@Component({
  selector: 'app-crear-montura',
  templateUrl: './crear-montura.component.html',
  styleUrls: ['./crear-montura.component.css']
})
export class CrearMonturaComponent implements OnInit {
  monturaForm: FormGroup;
  private _monturaService: any;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private monturaService: MonturaService) {
    this.monturaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
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
    this.monturaService.guardarMontura(MONTURA).subscribe((data: any) => {
      this.toastr.success('La montura fue registrado con éxito!', 'Montura Registrado!');
      this.router.navigate(['/dashboard-gerente/montura']);
    }, error => {
      console.log(error);
      this.monturaForm.reset();
    });

  }

}
