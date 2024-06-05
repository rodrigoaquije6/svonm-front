import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-gerente',
  templateUrl: './dashboard-gerente.component.html',
  styleUrls: ['./dashboard-gerente.component.css']
})
export class DashboardGerenteComponent {
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
