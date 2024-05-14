import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionRegisterFormComponent } from './contribution-register-form.component';

describe('ContributionRegisterFormComponent', () => {
  let component: ContributionRegisterFormComponent;
  let fixture: ComponentFixture<ContributionRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionRegisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
