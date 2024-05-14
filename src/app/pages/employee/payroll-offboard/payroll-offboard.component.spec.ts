import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollOffboardComponent } from './payroll-offboard.component';

describe('PayrollOffboardComponent', () => {
  let component: PayrollOffboardComponent;
  let fixture: ComponentFixture<PayrollOffboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollOffboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollOffboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
