import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOtMatrixFormComponent } from './employee-ot-matrix-form.component';

describe('EmployeeOtMatrixFormComponent', () => {
  let component: EmployeeOtMatrixFormComponent;
  let fixture: ComponentFixture<EmployeeOtMatrixFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOtMatrixFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOtMatrixFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
