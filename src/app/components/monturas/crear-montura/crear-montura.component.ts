import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
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

  titulo = 'Crear montura';

  id: string | null;

  marca: any[] = [];
  url = 'http://localhost:4000/api/crear-marca/' //https://shiny-tribble-rqj5r9gj7xwf5x55-4000.app.github.dev/api/crear-marca/ 

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _monturaService: MonturaService,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.monturaForm = this.fb.group({
      codigo: ['', Validators.required],
      marca: ['', Validators.required],
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      género:['', Validators.required],
      precio: ['', Validators.required],
      forma: ['', Validators.required],
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
      género: this.monturaForm.get('género')?.value,
      precio: this.monturaForm.get('precio')?.value,
      forma: this.monturaForm.get('forma')?.value,
      imagen: this.monturaForm.get('imagen')?.value,
    }

    if (this.id !== null) {
      //editamos rol
      this._monturaService.editarMontura(this.id, MONTURA).subscribe(data => {
        this.toastr.info('La montura fue actualizada con éxito!', 'Montura Actualizada!')
        this.router.navigate(['/dashboard-gerente/montura']);
      }, error => {
        console.log(error);
        this.monturaForm.reset();
      })

    } else {

      console.log(MONTURA);
      this._monturaService.guardarMontura(MONTURA).subscribe(data => {
        this.toastr.success('La montura fue registrada con éxito!', 'Montura Registrada!');
        this.router.navigate(['/dashboard-gerente/montura']);
      }, error => {
        console.log(error);
        this.monturaForm.reset();
      })
    }
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
          género: data.género,
          precio: data.precio,
          forma: data.forma,
          imagen: data.imagen,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }

}
