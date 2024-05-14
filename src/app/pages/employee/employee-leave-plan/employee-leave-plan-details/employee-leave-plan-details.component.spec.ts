import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeavePlanDetailsComponent } from './employee-leave-plan-details.component';

describe('EmployeeLeavePlanDetailsComponent', () => {
  let component: EmployeeLeavePlanDetailsComponent;
  let fixture: ComponentFixture<EmployeeLeavePlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLeavePlanDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLeavePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
