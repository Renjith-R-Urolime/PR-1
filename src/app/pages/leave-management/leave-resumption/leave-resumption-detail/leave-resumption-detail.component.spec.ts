import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveResumptionDetailComponent } from './leave-resumption-detail.component';

describe('LeaveResumptionDetailComponent', () => {
  let component: LeaveResumptionDetailComponent;
  let fixture: ComponentFixture<LeaveResumptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveResumptionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveResumptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
