import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountNationalityReportComponent } from './headcount-nationality-report.component';

describe('HeadcountNationalityReportComponent', () => {
  let component: HeadcountNationalityReportComponent;
  let fixture: ComponentFixture<HeadcountNationalityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadcountNationalityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadcountNationalityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
