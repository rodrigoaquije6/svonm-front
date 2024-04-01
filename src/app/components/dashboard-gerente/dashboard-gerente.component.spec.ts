import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGerenteComponent } from './dashboard-gerente.component';

describe('DashboardGerenteComponent', () => {
  let component: DashboardGerenteComponent;
  let fixture: ComponentFixture<DashboardGerenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardGerenteComponent]
    });
    fixture = TestBed.createComponent(DashboardGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
