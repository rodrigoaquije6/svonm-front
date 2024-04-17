import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMonturaComponent } from './crear-montura.component';

describe('CrearMonturaComponent', () => {
  let component: CrearMonturaComponent;
  let fixture: ComponentFixture<CrearMonturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearMonturaComponent]
    });
    fixture = TestBed.createComponent(CrearMonturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
