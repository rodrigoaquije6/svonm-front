import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { IngresoService } from 'src/app/services/ingreso.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent {
  ingresoForm: FormGroup;

  ingreso: any = {};
  detallesIngreso: any[] = [];

  productosAgregados: (Producto & { cantidad: number; total: number })[] = [];

  titulo = 'Crear Ingreso';

  id: string | null;

  constructor(
    private _ingresoService: IngresoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.ingresoForm = this.fb.group({
      observacion: ['', Validators.required],
      descuento: [''],
      impuesto: [''],
      subtotal: ['', Validators.required],
      total: ['', Validators.required],
      fechaEntregaEstimada: ['', Validators.required],
      estado: ['Pendiente'],
      idProveedor: ['', Validators.required],
      idTrabajador: ['', Validators.required],
      productosAgregados: this.fb.array([]),
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.id !== null) { // Asumiendo que tienes un ID válido para buscar la venta
      this._ingresoService.obtenerIngreso(this.id).subscribe(
        (data: any) => { // Asegúrate de que 'data' tenga el tipo correcto según la respuesta del servicio
          this.ingreso = data;
          this.detallesIngreso = data.detallesIngreso;

          // Asigna los valores al formulario usando patchValue
          this.ingresoForm.patchValue({
            observacion: data.observacion,
            descuento: data.descuento,
            impuesto: data.impuesto,
            subtotal: data.subtotal,
            total: data.total,
            fechaEntregaEstimada: this.formatDate(new Date(this.ingreso.fechaEntregaEstimada)),
            estado: data.estado,
            idProveedor: data.idProveedor,
            idTrabajador: data.idTrabajador
          });

          // Actualiza productosAgregados
          const productosAgregadosFormArray = this.ingresoForm.get('productosAgregados') as FormArray;
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
        },
        (error: any) => {
          console.error('Error al obtener la venta:', error);
          this.toastr.error('Error al obtener la venta. Por favor, inténtelo de nuevo más tarde.', 'Error');
        }
      );
    }
  }

  formatDate(date: any): string {
    if (!date) return '';

    // Asegúrate de convertir a Date si no lo es
    if (!(date instanceof Date)) {
      date = new Date(date); // Intenta convertirlo a Date
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
