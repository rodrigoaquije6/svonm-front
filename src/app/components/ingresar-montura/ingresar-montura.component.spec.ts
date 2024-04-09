import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarMonturaComponent } from './ingresar-montura.component';

describe('IngresarMonturaComponent', () => {
  let component: IngresarMonturaComponent;
  let fixture: ComponentFixture<IngresarMonturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarMonturaComponent]
    });
    fixture = TestBed.createComponent(IngresarMonturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
