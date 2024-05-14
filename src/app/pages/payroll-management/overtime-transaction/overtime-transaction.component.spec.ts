import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeTransactionComponent } from './overtime-transaction.component';

describe('OvertimeTransactionComponent', () => {
  let component: OvertimeTransactionComponent;
  let fixture: ComponentFixture<OvertimeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
