import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

class MockRouter {
  createUrlTree(commands: any[]): any {
    return commands;
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useClass: MockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if token and role match', () => {
    spyOn(localStorage, 'getItem').and.returnValues('dummyToken', '1');
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toEqual(true);
  });

  it('should redirect to unauthorized if role does not match', () => {
    spyOn(localStorage, 'getItem').and.returnValues('dummyToken', '2');
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;
    const navigateSpy = spyOn(router, 'createUrlTree').and.returnValue(router.createUrlTree(['/unauthorized']));
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(navigateSpy).toHaveBeenCalledWith(['/unauthorized']);
    expect(canActivate).toEqual(router.createUrlTree(['/unauthorized']));
  });

  it('should redirect to login if token is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, null);
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;
    const navigateSpy = spyOn(router, 'createUrlTree').and.returnValue(router.createUrlTree(['/login']));
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(canActivate).toEqual(router.createUrlTree(['/login']));
  });
});
