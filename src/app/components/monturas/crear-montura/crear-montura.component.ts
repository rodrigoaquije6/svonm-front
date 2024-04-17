import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  titulo = 'Crear producto';

  id: string | null;

  imagenSeleccionada: string = '';

  marca: any[] = [];
  url = 'http://localhost:4000/api/crear-marca/' //https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _monturaService: MonturaService,
    private aRouter: ActivatedRoute,
    private http:HttpClient
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
    this.obtenerMarca();
    this.esEditar();
  }

  obtenerMarca() {
    this.http.get<any[]>(this.url).subscribe(
      (marcas) => {
        this.marca = marcas;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos:', error);
      }
    );
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

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._monturaService.obtenerMontura(this.id).subscribe(data => {
        this.monturaForm.setValue({
          codigo: data.codigo,
          marca: data.marca,
          nombre: data.nombre,
          color: data.color,
          precio: data.precio,
          imagen: data.imagen,
        })
      })
    }
  }

}
