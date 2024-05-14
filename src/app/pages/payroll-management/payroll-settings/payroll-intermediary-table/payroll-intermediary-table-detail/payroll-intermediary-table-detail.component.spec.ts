import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollIntermediaryTableDetailComponent } from './payroll-intermediary-table-detail.component';

describe('PayrollIntermediaryTableDetailComponent', () => {
  let component: PayrollIntermediaryTableDetailComponent;
  let fixture: ComponentFixture<PayrollIntermediaryTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollIntermediaryTableDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollIntermediaryTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
