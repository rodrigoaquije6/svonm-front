import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarStockComponent } from './editar-stock.component';

describe('EditarStockComponent', () => {
  let component: EditarStockComponent;
  let fixture: ComponentFixture<EditarStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarStockComponent]
    });
    fixture = TestBed.createComponent(EditarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
