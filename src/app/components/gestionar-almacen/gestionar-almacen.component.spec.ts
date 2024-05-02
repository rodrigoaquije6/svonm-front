import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarAlmacenComponent } from './gestionar-almacen.component';

describe('GestionarAlmacenComponent', () => {
  let component: GestionarAlmacenComponent;
  let fixture: ComponentFixture<GestionarAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarAlmacenComponent]
    });
    fixture = TestBed.createComponent(GestionarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
