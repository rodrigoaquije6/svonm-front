import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  clienteForm: FormGroup;

  titulo = 'Crear Cliente'

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _clienteService: ClienteService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    this.clienteForm= this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      estado: ['Activo', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarCliente() {

    if (this.clienteForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const CLIENTE: Cliente = {
      dni: this.clienteForm.get('dni')?.value,
      nombres: this.clienteForm.get('nombres')?.value,
      apellidos: this.clienteForm.get('apellidos')?.value,
      celular: this.clienteForm.get('celular')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      correo: this.clienteForm.get('correo')?.value,
      estado: this.clienteForm.get('estado')?.value,
    }

    if (this.id !== null) {
      this._clienteService.editarCliente(this.id, CLIENTE).subscribe(data => {
        this.toastr.info('El cliente fue actualizado con éxito!', 'Cliente Actualizado!')
        this.router.navigate(['/dashboard-trabajador/cliente']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.clienteForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    } else {
      console.log(CLIENTE);
      this._clienteService.guardarCliente(CLIENTE).subscribe(data => {
        this.toastr.success('El cliente fue registrado con éxito!', 'Cliente Registrado!');
        this.router.navigate(['/dashboard-trabajador/cliente']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.clienteForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Cliente';
      this._clienteService.obtenerCliente(this.id).subscribe(data => {
        this.clienteForm.setValue({
          dni: data.dni,
          nombres: data.nombres,
          apellidos: data.apellidos,
          celular: data.celular,
          direccion: data.direccion,
          correo: data.correo,
          estado: data.estado,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    this.router.navigate(['login']);
  }
}
