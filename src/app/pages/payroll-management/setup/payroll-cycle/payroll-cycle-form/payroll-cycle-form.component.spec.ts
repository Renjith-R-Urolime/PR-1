import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCycleFormComponent } from './payroll-cycle-form.component';

describe('PayrollCycleFormComponent', () => {
  let component: PayrollCycleFormComponent;
  let fixture: ComponentFixture<PayrollCycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollCycleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollCycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
