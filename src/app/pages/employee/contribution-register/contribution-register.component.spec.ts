import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionRegisterComponent } from './contribution-register.component';

describe('ContributionRegisterComponent', () => {
  let component: ContributionRegisterComponent;
  let fixture: ComponentFixture<ContributionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
