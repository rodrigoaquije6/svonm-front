import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-trabajador',
  templateUrl: './dashboard-trabajador.component.html',
  styleUrls: ['./dashboard-trabajador.component.css']
})
export class DashboardTrabajadorComponent {
  isLoggedIn: boolean = this.api.isLogged();

  constructor(private api: LoginService, private router: Router) {}

  ngOnInit(): void {
  }

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }


}
