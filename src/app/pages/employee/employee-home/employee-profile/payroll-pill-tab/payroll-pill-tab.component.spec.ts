import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollPillTabComponent } from './payroll-pill-tab.component';

describe('PayrollPillTabComponent', () => {
  let component: PayrollPillTabComponent;
  let fixture: ComponentFixture<PayrollPillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollPillTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollPillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
