import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollOnboardComponent } from './payroll-onboard.component';

describe('PayrollOnboardComponent', () => {
  let component: PayrollOnboardComponent;
  let fixture: ComponentFixture<PayrollOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollOnboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
