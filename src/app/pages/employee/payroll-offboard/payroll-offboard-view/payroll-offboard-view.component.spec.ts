import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollOffboardViewComponent } from './payroll-offboard-view.component';

describe('PayrollOffboardViewComponent', () => {
  let component: PayrollOffboardViewComponent;
  let fixture: ComponentFixture<PayrollOffboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollOffboardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollOffboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
