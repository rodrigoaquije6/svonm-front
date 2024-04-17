import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMonturaComponent } from './ver-montura.component';

describe('VerMonturaComponent', () => {
  let component: VerMonturaComponent;
  let fixture: ComponentFixture<VerMonturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerMonturaComponent]
    });
    fixture = TestBed.createComponent(VerMonturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
