import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionRegisterDetailComponent } from './contribution-register-detail.component';

describe('ContributionRegisterDetailComponent', () => {
  let component: ContributionRegisterDetailComponent;
  let fixture: ComponentFixture<ContributionRegisterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionRegisterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionRegisterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
