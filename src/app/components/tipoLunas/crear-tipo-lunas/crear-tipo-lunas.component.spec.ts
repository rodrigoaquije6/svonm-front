import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoLunasComponent } from './crear-tipo-lunas.component';

describe('CrearTipoLunasComponent', () => {
  let component: CrearTipoLunasComponent;
  let fixture: ComponentFixture<CrearTipoLunasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTipoLunasComponent]
    });
    fixture = TestBed.createComponent(CrearTipoLunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
