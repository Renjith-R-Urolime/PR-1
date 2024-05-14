import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProgressWidgetComponent } from './payroll-progress-widget.component';

describe('PayrollProgressWidgetComponent', () => {
  let component: PayrollProgressWidgetComponent;
  let fixture: ComponentFixture<PayrollProgressWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollProgressWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollProgressWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
