import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { ToastrService } from 'ngx-toastr';
import { NombreLuna } from 'src/app/models/luna';
import { LunaService } from 'src/app/services/luna.service';

@Component({
  selector: 'app-tipo-luna',
  templateUrl: './tipo-luna.component.html',
  styleUrls: ['./tipo-luna.component.css']
})
export class TipoLunaComponent implements OnInit {
  NombreLunaForm: FormGroup;
  titulo = 'Crear Tipo de Luna';

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _lunaService: LunaService,
    private api: LoginService,) {
    this.NombreLunaForm = this.fb.group({
      tipoluna: ['', Validators.required],
      preciodeluna: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarTipoLuna() {

    const NombreLuna: NombreLuna = {
      tipoluna: this.NombreLunaForm.get('tipoluna')?.value,
      preciodeluna: this.NombreLunaForm.get('preciodeluna')?.value,
    }

    if (this.id !== null) {
      //editamos luna
      this._lunaService.editarNombreLuna(this.id, NombreLuna).subscribe(data => {
        this.toastr.info('El tipo de luna fue actualizada con éxito!', 'Tipo Luna Actualizada!')
        this.router.navigate(['/dashboard-gerente/luna']);
      }, error => {
        console.log(error);
        this.NombreLunaForm.reset();
      })

    } else {
      //agregamos luna
      console.log(NombreLuna);
      this._lunaService.guardarNombreLuna(NombreLuna).subscribe(data => {
        this.toastr.success('El tipo de luna fue registrada con éxito!', 'Tipo Luna Registrada!');
        this.router.navigate(['/dashboard-gerente/luna']);
      }, error => {
        console.log(error);
        this.NombreLunaForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar tipo de Luna';
      this._lunaService.obtenerLuna(this.id).subscribe(data => {
        this.NombreLunaForm.setValue({
          tipoluna: data.tipoluna,
          preciodeluna: data.preciodeluna,
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
