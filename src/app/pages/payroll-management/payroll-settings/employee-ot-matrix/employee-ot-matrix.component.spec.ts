import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOtMatrixComponent } from './employee-ot-matrix.component';

describe('EmployeeOtMatrixComponent', () => {
  let component: EmployeeOtMatrixComponent;
  let fixture: ComponentFixture<EmployeeOtMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOtMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOtMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
