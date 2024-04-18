import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLunaComponent } from './crear-luna.component';

describe('CrearLunaComponent', () => {
  let component: CrearLunaComponent;
  let fixture: ComponentFixture<CrearLunaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearLunaComponent]
    });
    fixture = TestBed.createComponent(CrearLunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
