import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionMasterFormComponent } from './contribution-master-form.component';

describe('ContributionMasterFormComponent', () => {
  let component: ContributionMasterFormComponent;
  let fixture: ComponentFixture<ContributionMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
