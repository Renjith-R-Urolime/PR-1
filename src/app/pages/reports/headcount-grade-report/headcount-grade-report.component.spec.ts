import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountGradeReportComponent } from './headcount-grade-report.component';

describe('HeadcountGradeReportComponent', () => {
  let component: HeadcountGradeReportComponent;
  let fixture: ComponentFixture<HeadcountGradeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadcountGradeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadcountGradeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
