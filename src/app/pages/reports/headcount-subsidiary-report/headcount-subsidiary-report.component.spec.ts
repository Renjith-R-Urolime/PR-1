import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountSubsidiaryReportComponent } from './headcount-subsidiary-report.component';

describe('HeadcountSubsidiaryReportComponent', () => {
  let component: HeadcountSubsidiaryReportComponent;
  let fixture: ComponentFixture<HeadcountSubsidiaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadcountSubsidiaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadcountSubsidiaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
