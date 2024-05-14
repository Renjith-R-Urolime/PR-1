import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollIntermediaryTableComponent } from './payroll-intermediary-table.component';

describe('PayrollIntermediaryTableComponent', () => {
  let component: PayrollIntermediaryTableComponent;
  let fixture: ComponentFixture<PayrollIntermediaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollIntermediaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollIntermediaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
