import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  tipoP: any[] = [];

  url = 'https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/' //http://localhost:4000/api/tipoProducto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _productoService: ProductoService,
    private http: HttpClient,
    private el: ElementRef) {
    this.productoForm = this.fb.group({
      código: ['', Validators.required],
      tipoP: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [''],
    })
  }

  ngOnInit(): void {
    this.obtenerTiposProducto();
  }

  obtenerTiposProducto() {
    this.http.get<any[]>(this.url).subscribe(
      (tipos) => {
        this.tipoP = tipos;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos:', error);
      }
    );
  }

  agregarProducto() {

    const PRODUCTO: Producto = {
      código: this.productoForm.get('código')?.value,
      tipoP: this.productoForm.get('tipoP')?.value,
      nombre: this.productoForm.get('nombre')?.value,
      precio: this.productoForm.get('precio')?.value,
      imagen: this.productoForm.get('imagen')?.value,
    }

    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
      this.router.navigate(['/dashboard-gerente/producto']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.getBase64(file).then((result: string) => {
      const blob = this.dataURItoBlob(result);
      // Ahora puedes almacenar 'blob' en tu objeto Producto o hacer lo que necesites con él
    });
  }

  // Convertir archivo a base64
  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Convertir data URI a Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer]);
  }
  
}
