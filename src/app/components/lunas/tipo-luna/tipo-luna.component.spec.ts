import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoLunaComponent } from './tipo-luna.component';

describe('TipoLunaComponent', () => {
  let component: TipoLunaComponent;
  let fixture: ComponentFixture<TipoLunaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoLunaComponent]
    });
    fixture = TestBed.createComponent(TipoLunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
