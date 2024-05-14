import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionSummaryDetailComponent } from './contribution-summary-detail.component';

describe('ContributionSummaryDetailComponent', () => {
  let component: ContributionSummaryDetailComponent;
  let fixture: ComponentFixture<ContributionSummaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionSummaryDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
