import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDevolucionComponent } from './detalle-devolucion.component';

describe('DetalleDevolucionComponent', () => {
  let component: DetalleDevolucionComponent;
  let fixture: ComponentFixture<DetalleDevolucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleDevolucionComponent]
    });
    fixture = TestBed.createComponent(DetalleDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
