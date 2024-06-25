import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { ToastrService } from 'ngx-toastr';
import { Luna } from 'src/app/models/luna';
import { LunaService } from 'src/app/services/luna.service';

@Component({
  selector: 'app-crear-luna',
  templateUrl: './crear-luna.component.html',
  styleUrls: ['./crear-luna.component.css']
})
export class CrearLunaComponent implements OnInit {
  lunaForm: FormGroup;

  titulo = 'Crear Tipo Luna';

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _lunaService: LunaService,
    private api: LoginService,) {
    this.lunaForm = this.fb.group({
      material: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarLuna() {

    if (this.lunaForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const LUNA: Luna = {
      material: this.lunaForm.get('material')?.value,
      precio: this.lunaForm.get('precio')?.value,
    }

    if (this.id !== null) {
      //editamos luna
      this._lunaService.editarLuna(this.id, LUNA).subscribe(data => {
        this.toastr.info('La luna fue actualizada con éxito!', 'Luna Actualizada!')
        this.router.navigate(['/dashboard-gerente/luna']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.lunaForm.reset();
        }
        //console.log(error);
        //this.lunaForm.reset();
      })
    } else {
      //agregamos luna
      console.log(LUNA);
      this._lunaService.guardarLuna(LUNA).subscribe(data => {
        this.toastr.success('La luna fue registrada con éxito!', 'Luna Registrada!');
        this.router.navigate(['/dashboard-gerente/luna']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.lunaForm.reset();
        }
        //console.log(error);
        //this.lunaForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Tipo Luna';
      this._lunaService.obtenerLuna(this.id).subscribe(data => {
        this.lunaForm.setValue({
          material: data.material,
          precio: data.precio,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('luna');
    this.router.navigate(['login']);
  }

}
