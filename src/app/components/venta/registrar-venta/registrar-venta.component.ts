import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { LunaService } from 'src/app/services/luna.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit {

  registrarventaForm: FormGroup;

  titulo = 'Registrar Venta';

  id: string | null;

  luna: any[] = [];

  url = 'https://laughing-disco-69999gqpq94w245x6-4000.app.github.dev/api/luna/'

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _lunaService: LunaService,
    private _ventaService: VentaService,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.registrarventaForm = this.fb.group({
      precioLuna: ["S/"],
      precioMontura: ['', Validators.required],
      precioTotal: ["S/"],
      A_Cuenta: ["S/"],
      Saldo: [{value: "S/", disabled: true}]})
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }


  ngOnInit(): void {
    this.esEditar();
    this.registrarventaForm.get('precioTotal')?.valueChanges.subscribe(()=>{
      this.calculateBalance();
    })
    this.registrarventaForm.get('A_Cuenta')?.valueChanges.subscribe(()=>{
      this.calculateBalance();
    })
    this.obtenerLuna();
  }
  obtenerLuna() {
    this.http.get<any[]>(this.url).subscribe(
      (lunas) => {
        this.luna = lunas;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos:', error);
      }
    );
  } 
  loadLunas(): void {
    this._lunaService.getLunas().subscribe(data => {
      this.luna = data;
    });
  }

  calculateBalance(){
    const precioLuna = parseFloat(this.registrarventaForm.get('precioLuna')?.value) || 0;
    const precioTotal = precioLuna;
    const A_Cuenta = parseFloat(this.registrarventaForm.get('A_Cuenta')?.value) || 0;
    const Saldo = precioTotal - A_Cuenta;
    this.registrarventaForm.get('precioTotal')?.setValue(precioTotal.toFixed(2), { emitEvent: false });
    this.registrarventaForm.get('Saldo')?.setValue(Saldo.toFixed(2), { emitEvent: false });

    if(Saldo<0){
      this.toastr.info('El saldo no puede ser negativo', 'Error')

    }
  }

  agregarVenta() {


    const VENTA: Venta = {

      precioLuna: this.registrarventaForm.get('precioLuna')?.value,
      precioMontura: this.registrarventaForm.get('precioMontura')?.value,
      precioTotal: this.registrarventaForm.get('precioTotal')?.value,
      A_Cuenta: this.registrarventaForm.get('A_Cuenta')?.value,
      Saldo: this.registrarventaForm.get('Saldo')?.value

    }

    if (this.id !== null) {
      //editamos rol
      this._ventaService.editarVenta(this.id, VENTA).subscribe(data => {
        this.toastr.info('La marca fue actualizada con éxito!', 'Marca Actualizada!')
        this.router.navigate(['/dashboard-trabajador/venta']);
      }, error => {
        console.log(error);
        this.registrarventaForm.reset();
      })

    } else {
      console.log(VENTA);
      this._ventaService.guardarVenta(VENTA).subscribe(data => {

        this.toastr.success('La marca fue registrada con éxito!', 'Marca registrada!')
        this.router.navigate(['/dashboard-trabajador/venta'])
      }, error => {
        console.log(error);
        this.registrarventaForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Marca';
      this._ventaService.obtenerVenta(this.id).subscribe(data => {
        this.registrarventaForm.setValue({
          precio: data.precio
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