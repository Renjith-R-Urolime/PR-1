import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeTransactionDetailComponent } from './overtime-transaction-detail.component';

describe('OvertimeTransactionDetailComponent', () => {
  let component: OvertimeTransactionDetailComponent;
  let fixture: ComponentFixture<OvertimeTransactionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeTransactionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
