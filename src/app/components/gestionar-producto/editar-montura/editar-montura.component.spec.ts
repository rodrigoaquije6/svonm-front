import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMonturaComponent } from './editar-montura.component';

describe('EditarMonturaComponent', () => {
  let component: EditarMonturaComponent;
  let fixture: ComponentFixture<EditarMonturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMonturaComponent]
    });
    fixture = TestBed.createComponent(EditarMonturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
