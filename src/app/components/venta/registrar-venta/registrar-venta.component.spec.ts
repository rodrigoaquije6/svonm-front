import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVentaComponent } from './registrar-venta.component';

describe('RegistrarVentaComponent', () => {
  let component: RegistrarVentaComponent;
  let fixture: ComponentFixture<RegistrarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarVentaComponent]
    });
    fixture = TestBed.createComponent(RegistrarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
