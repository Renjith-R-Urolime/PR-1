import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeTransactionFormComponent } from './overtime-transaction-form.component';

describe('OvertimeTransactionFormComponent', () => {
  let component: OvertimeTransactionFormComponent;
  let fixture: ComponentFixture<OvertimeTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
