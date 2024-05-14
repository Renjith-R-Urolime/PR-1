import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSchedulerDetailComponent } from './shift-scheduler-detail.component';

describe('ShiftSchedulerDetailComponent', () => {
  let component: ShiftSchedulerDetailComponent;
  let fixture: ComponentFixture<ShiftSchedulerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSchedulerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSchedulerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
