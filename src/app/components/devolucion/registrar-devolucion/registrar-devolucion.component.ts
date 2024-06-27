import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';
import { Producto } from 'src/app/models/producto';
import { Cliente } from 'src/app/models/cliente';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { LunaService } from 'src/app/services/luna.service';
import { TipoLunaService } from 'src/app/services/tipoLuna.service';
import { DevolucionService } from 'src/app/services/devolucion.service';

@Component({
  selector: 'app-registrar-devolucion',
  templateUrl: './registrar-devolucion.component.html',
  styleUrls: ['./registrar-devolucion.component.css']
})
export class RegistrarDevolucionComponent {

  ventaForm: FormGroup;
  devolucionForm: FormGroup;

  venta: any = {};
  detallesVenta: any[] = [];

  tratamientosOptions: { _id: string, nombre: string, precio: number }[] = [];
  tiposLunaOptions: { _id: string, nombre: string, precio: number }[] = [];
  materialLunaOptions: { _id: string, material: string, precio: number }[] = [];

  productosAgregados: (Producto & { cantidad: number; total: number })[] = [];
  productosDevueltos: (Producto & { cantidad: number })[] = [];

  nombresTrabajador: string | undefined;
  apellidosTrabajador: string | undefined;

  id: string | null;

  constructor(
    private _devolucionService: DevolucionService,
    private _tratamientoService: TratamientoService,
    private _lunaService: LunaService,
    private _tipoLunaService: TipoLunaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _ventaService: VentaService,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.ventaForm = this.fb.group({
      oDEsfera: '',
      oDCilindro: '',
      oDEje: '',
      oDAvLejos: '',
      oDAvCerca: '',
      oDAdd: '',
      oDAltura: '',
      oDCurva: '',
      oIEsfera: '',
      oICilindro: '',
      oIEje: '',
      oIAvLejos: '',
      oIAvCerca: '',
      oIAdd: '',
      oIAltura: '',
      oICurva: '',
      dipLejos: '',
      dipCerca: '',
      observacion: ['', Validators.required],
      aCuenta: ['', Validators.required],
      saldo: ['', Validators.required],
      total: ['', Validators.required],
      estado: ['En fabricación'],
      idCliente: ['', Validators.required],
      idTrabajador: ['', Validators.required],
      idTipoLuna: '',
      idMaterialLuna: '',
      productosAgregados: this.fb.array([]),
      tratamientosAgregados: this.fb.array([])
    });
    this.devolucionForm = this.fb.group({
      motivo: ['', Validators.required],
      observacion: ['', Validators.required],
      total: ['', Validators.required],
      idVenta: ['', Validators.required],
      idTrabajador: ['', Validators.required],
      productosDevolucion: this.fb.array([]),
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerTratamientos();
    this.obtenerTiposLuna();
    this.obtenerMatLuna();
    this.esEditar();
    this.obtenerPerfilTrabajador();
  };

  obtenerPerfilTrabajador() {
    this.api.getProfile().subscribe(
      (profile) => {
        this.nombresTrabajador = profile.nombres;
        this.apellidosTrabajador = profile.apellidos;
        // Asigna el ID del trabajador automáticamente al formulario
        this.devolucionForm.patchValue({
          idTrabajador: profile._id
        });
      },
      (error) => {
        console.error('Error al obtener el perfil del trabajador:', error);
        // Manejo de errores
      }
    );
  }

  obtenerMatLuna() {
    this._lunaService.getLunas().subscribe(
      (materiales: any[]) => {
        this.materialLunaOptions = materiales;
      },
      (error) => {
        console.error('Error al obtener los materiales de luna:', error);
      }
    );
  }

  obtenerTiposLuna() {
    this._tipoLunaService.getTipoLunas().subscribe(
      (tipos: any[]) => {
        this.tiposLunaOptions = tipos;
      },
      (error) => {
        console.error('Error al obtener los tipos de luna:', error);
      }
    );
  }

  obtenerTratamientos() {
    this._tratamientoService.getTratamientos().subscribe(
      (tratamientos: any[]) => {
        // Asigna los tratamientos obtenidos a tu lista de opciones de tratamiento
        this.tratamientosOptions = tratamientos;
      },
      (error) => {
        console.error('Error al obtener los tratamientos:', error);
      }
    );
  }

  tratamientoEstaEnVenta(tratamientoOption: any): boolean {
    if (this.venta && this.venta.detallesTratamiento) {
      return this.venta.detallesTratamiento.some((detalle: any) => detalle.idTratamiento === tratamientoOption._id);
    }
    return false;
  }

  guardarDevolucion() {
    // Igualar el total de la devolución al total de la venta
    const totalVenta = this.venta.venta.total;
    const idVenta = this.venta.venta._id; // Asumiendo que this.id es el ID de la venta

    // Asegurarse de que los productos devueltos coincidan con los detalles de la venta
    const detallesVenta = this.venta.detallesVenta;
    const productosDevueltosArray = this.devolucionForm.get('productosDevolucion') as FormArray;
    productosDevueltosArray.clear();

    detallesVenta.forEach((detalle: any) => {
      productosDevueltosArray.push(this.fb.group({
        cantidad: [detalle.cantidad, Validators.required],
        _id: [detalle.idProducto, Validators.required]
      }));
    });

    // Actualizar el total y idVenta en el formulario de devolución
    this.devolucionForm.patchValue({
      total: totalVenta,
      idVenta: idVenta
    });

    if (this.devolucionForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos correctamente en el formulario de devolución.', 'Error');
      return;
    }

    const devolucionData = this.devolucionForm.value;

    // Llamar al servicio para guardar la devolución
    this._devolucionService.guardarDevolucion(devolucionData).subscribe(
      (data) => {
        this.toastr.success('La devolución ha sido registrada exitosamente.', 'Devolución Registrada');
        this.router.navigate(['/dashboard-trabajador/devolucion']);
      },
      (error) => {
        console.error('Error al guardar la devolución:', error);
        this.toastr.error('Ocurrió un error al guardar la devolución. Por favor, inténtelo de nuevo más tarde.', 'Error');
      }
    );
  }

  esEditar() {
    if (this.id !== null) { // Asumiendo que tienes un ID válido para buscar la venta
      this._ventaService.obtenerVenta(this.id).subscribe(
        (data: any) => { // Asegúrate de que 'data' tenga el tipo correcto según la respuesta del servicio
          this.venta = data;
          this.detallesVenta = data.detallesVenta;

          // Asigna los valores al formulario usando patchValue
          this.ventaForm.patchValue({
            oDEsfera: data.oDEsfera,
            oDCilindro: data.oDCilindro,
            oDEje: data.oDEje,
            oDAvLejos: data.oDAvLejos,
            oDAvCerca: data.oDAvCerca,
            oDAdd: data.oDAdd,
            oDAltura: data.oDAltura,
            oDCurva: data.oDCurva,
            oIEsfera: data.oIEsfera,
            oICilindro: data.oICilindro,
            oIEje: data.oIEje,
            oIAvLejos: data.oIAvLejos,
            oIAvCerca: data.oIAvCerca,
            oIAdd: data.oIAdd,
            oIAltura: data.oIAltura,
            oICurva: data.oICurva,
            dipLejos: data.dipLejos,
            dipCerca: data.dipCerca,
            observacion: data.observacion,
            aCuenta: data.aCuenta,
            saldo: data.saldo,
            total: data.total,
            estado: data.estado,
            idCliente: data.idCliente,
            idTrabajador: data.idTrabajador,
            idTipoLuna: data.idTipoLuna,
            idMaterialLuna: data.idMaterialLuna
          });

          // Actualiza productosAgregados
          const productosAgregadosFormArray = this.ventaForm.get('productosAgregados') as FormArray;
          productosAgregadosFormArray.clear(); // Limpia el FormArray antes de agregar nuevos elementos
          if (Array.isArray(data.productosAgregados)) {
            data.productosAgregados.forEach((producto: any) => {
              productosAgregadosFormArray.push(this.fb.group({
                _id: producto._id,
                cantidad: producto.cantidad,
                total: producto.total
              }));
            });
          }

          // Actualiza tratamientosAgregados
          const tratamientosAgregadosFormArray = this.ventaForm.get('tratamientosAgregados') as FormArray;
          tratamientosAgregadosFormArray.clear(); // Limpia el FormArray antes de agregar nuevos elementos
          if (Array.isArray(data.tratamientosAgregados)) {
            data.tratamientosAgregados.forEach((tratamiento: any) => {
              tratamientosAgregadosFormArray.push(this.fb.group({
                _id: tratamiento._id
              }));
            });
          }
        },
        (error: any) => {
          console.error('Error al obtener la venta:', error);
          this.toastr.error('Error al obtener la venta. Por favor, inténtelo de nuevo más tarde.', 'Error');
        }
      );
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }

}
