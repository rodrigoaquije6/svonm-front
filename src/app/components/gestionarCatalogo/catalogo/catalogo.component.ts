import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'src/app/models/catalogo';
import { ToastrService } from 'ngx-toastr';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{
  listCatalogo: any[] = [];
  listProducto: any[] = [];
  listId:any[] =[];
  estado :string ="";
  id: string = "";
  icon: string = "";
  
  constructor(private _catalogoService: CatalogoService,
              private _prouctoService: ProductoService,
              private toastr: ToastrService,
              private api: LoginService,
              private router: Router) { }

              ngOnInit(): void {
                this.obtenerCatalogo();
               
              }

              obtenerCatalogo(){
                this._prouctoService.getProductos().subscribe(data => {
                  
                console.log(this._prouctoService);
                  this.listProducto = data;
                  
                  console.log(this.listProducto);
                  this._catalogoService.getCatalogo().subscribe(data => {
                  
                    console.log(this._catalogoService);
                      this.listId = data;
                      console.log(this.listId);
                      this.bind();
                      console.log(this.listCatalogo);
                      
                    }, error => {
                      console.log(error);
                    })

                }, error => {
                  console.log(error);
                  
                })
              }

              isLoggedIn: boolean = this.api.isLogged();

              bind() {
                // Creamos un nuevo array donde almacenaremos los resultados
                this.listCatalogo = this.listProducto.map((obj, indice) => {
                    // Creamos una copia del objeto original para no modificar el array original directamente
                    let nuevoObjeto = { ...obj };
            
                    // Si el índice es válido en el array listId, reemplazamos el primer campo (_id)
                    if (indice < this.listId.length) {
                        nuevoObjeto._id = this.listId[indice]._id; // Aquí reemplazamos el campo _id
                        nuevoObjeto.estado = this.listId[indice].estado; // Intercambiamos el campo estado
                    }
            
                    return nuevoObjeto;
                });
                this.addIconToCatalogo();
            }

            addIconToCatalogo() {
              this.listCatalogo.forEach(producto => {
                  producto.icon = producto.estado === 'Activo' ? 'fa-eye' : 'fa-eye-slash';
              });
          }
          
            

  editarEstado(id:string, estado:string){
    if (estado === 'Activo') {
      this.estado = 'Inactivo';
    } else{
      this.estado = 'Activo';
    }
    const catalogo: Catalogo = {
      estado: this.estado
    }

    this.id = id;

    this._catalogoService.editarEstado(this.id, catalogo).subscribe(data => {
      this.toastr.info('El estado fue actualizado con éxito!', 'estado Actualizado!')
      this.obtenerCatalogo();
    }, error => {
      if (error.error && error.error.msg) {
        error.error.msg.forEach((errorMessage: string) => {
          this.toastr.error(errorMessage, 'Error');
        });
      } else {
        console.log(error);
      }
    })
  }

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}


