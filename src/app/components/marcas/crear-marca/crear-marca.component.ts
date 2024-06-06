import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit {

  crearmarcaForm: FormGroup;

  titulo = 'Crear Marca';

  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _marcaService: MarcaService,
    private api: LoginService,
    private aRouter: ActivatedRoute) {
    this.crearmarcaForm = this.fb.group({

      nombre: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarMarca() {


    const MARCA: Marca = {

      nombre: this.crearmarcaForm.get('nombre')?.value

    }

    if (this.id !== null) {
      //editamos rol
      this._marcaService.editarMarca(this.id, MARCA).subscribe(data => {
        this.toastr.info('La marca fue actualizada con éxito!', 'Marca Actualizada!')
        this.router.navigate(['/dashboard-gerente/marca']);
      }, error => {
        console.log(error);
        this.crearmarcaForm.reset();
      })

    } else {
      console.log(MARCA);
      this._marcaService.guardarMarca(MARCA).subscribe(data => {

        this.toastr.success('La marca fue registrada con éxito!', 'Marca registrada!')
        this.router.navigate(['/dashboard-gerente/marca'])
      }, error => {
        console.log(error);
        this.crearmarcaForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Marca';
      this._marcaService.obtenerMarca(this.id).subscribe(data => {
        this.crearmarcaForm.setValue({
          nombre: data.nombre
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