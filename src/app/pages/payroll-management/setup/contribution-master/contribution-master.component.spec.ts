import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionMasterComponent } from './contribution-master.component';

describe('ContributionMasterComponent', () => {
  let component: ContributionMasterComponent;
  let fixture: ComponentFixture<ContributionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
