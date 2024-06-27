import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLunasComponent } from './tipo-lunas.component';

describe('TipoLunasComponent', () => {
  let component: TipoLunasComponent;
  let fixture: ComponentFixture<TipoLunasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoLunasComponent]
    });
    fixture = TestBed.createComponent(TipoLunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
