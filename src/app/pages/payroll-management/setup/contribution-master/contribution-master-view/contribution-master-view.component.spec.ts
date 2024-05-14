import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionMasterViewComponentTsComponent } from './contribution-master-view.component';

describe('ContributionMasterViewComponentTsComponent', () => {
  let component: ContributionMasterViewComponentTsComponent;
  let fixture: ComponentFixture<ContributionMasterViewComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionMasterViewComponentTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionMasterViewComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
