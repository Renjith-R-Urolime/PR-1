import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountLocationReportComponent } from './headcount-location-report.component';

describe('HeadcountLocationReportComponent', () => {
  let component: HeadcountLocationReportComponent;
  let fixture: ComponentFixture<HeadcountLocationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadcountLocationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadcountLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
