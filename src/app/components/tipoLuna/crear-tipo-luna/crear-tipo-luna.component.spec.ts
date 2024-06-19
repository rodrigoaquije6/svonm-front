import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoLunaComponent } from './crear-tipo-luna.component';

describe('CrearTipoLunaComponent', () => {
  let component: CrearTipoLunaComponent;
  let fixture: ComponentFixture<CrearTipoLunaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTipoLunaComponent]
    });
    fixture = TestBed.createComponent(CrearTipoLunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
