import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProductoComponent } from './gestionar-producto.component';

describe('GestionarProductoComponent', () => {
  let component: GestionarProductoComponent;
  let fixture: ComponentFixture<GestionarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarProductoComponent]
    });
    fixture = TestBed.createComponent(GestionarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
