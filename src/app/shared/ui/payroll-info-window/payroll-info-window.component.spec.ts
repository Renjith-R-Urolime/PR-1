import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollInfoWindowComponent } from './payroll-info-window.component';

describe('PayrollInfoWindowComponent', () => {
  let component: PayrollInfoWindowComponent;
  let fixture: ComponentFixture<PayrollInfoWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollInfoWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
