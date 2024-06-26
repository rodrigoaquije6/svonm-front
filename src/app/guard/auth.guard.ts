import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('rol');

    if (token && role) {
      const requiredRole = next.data['role'];
      if (role === requiredRole) {
        return true;
      } else {
        return this.router.createUrlTree(['unauthorized']);
      }
    } else {
      return this.router.createUrlTree(['login']);
    }
  }
}
