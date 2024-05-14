import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountDepartmentReportComponent } from './headcount-department-report.component';

describe('HeadcountDepartmentReportComponent', () => {
  let component: HeadcountDepartmentReportComponent;
  let fixture: ComponentFixture<HeadcountDepartmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadcountDepartmentReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadcountDepartmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
