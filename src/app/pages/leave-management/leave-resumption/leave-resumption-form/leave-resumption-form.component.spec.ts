import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveResumptionFormComponent } from './leave-resumption-form.component';

describe('LeaveResumptionFormComponent', () => {
  let component: LeaveResumptionFormComponent;
  let fixture: ComponentFixture<LeaveResumptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveResumptionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveResumptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
