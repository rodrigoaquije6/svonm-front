import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrabajadorComponent } from './dashboard-trabajador.component';

describe('DashboardTrabajadorComponent', () => {
  let component: DashboardTrabajadorComponent;
  let fixture: ComponentFixture<DashboardTrabajadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTrabajadorComponent]
    });
    fixture = TestBed.createComponent(DashboardTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
