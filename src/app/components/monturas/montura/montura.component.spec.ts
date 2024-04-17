import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonturaComponent } from './montura.component';

describe('MonturaComponent', () => {
  let component: MonturaComponent;
  let fixture: ComponentFixture<MonturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonturaComponent]
    });
    fixture = TestBed.createComponent(MonturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
