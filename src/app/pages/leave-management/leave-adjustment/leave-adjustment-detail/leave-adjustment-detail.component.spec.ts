import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAdjustmentDetailComponent } from './leave-adjustment-detail.component';

describe('LeaveAdjustmentDetailComponent', () => {
  let component: LeaveAdjustmentDetailComponent;
  let fixture: ComponentFixture<LeaveAdjustmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAdjustmentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAdjustmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
