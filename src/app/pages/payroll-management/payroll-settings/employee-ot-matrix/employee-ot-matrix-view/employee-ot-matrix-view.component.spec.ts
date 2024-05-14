import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOtMatrixViewComponent } from './employee-ot-matrix-view.component';

describe('EmployeeOtMatrixViewComponent', () => {
  let component: EmployeeOtMatrixViewComponent;
  let fixture: ComponentFixture<EmployeeOtMatrixViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOtMatrixViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOtMatrixViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
