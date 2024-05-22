import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarLenteSolComponent } from './editar-lente-sol.component';

describe('EditarLenteSolComponent', () => {
  let component: EditarLenteSolComponent;
  let fixture: ComponentFixture<EditarLenteSolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarLenteSolComponent]
    });
    fixture = TestBed.createComponent(EditarLenteSolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
