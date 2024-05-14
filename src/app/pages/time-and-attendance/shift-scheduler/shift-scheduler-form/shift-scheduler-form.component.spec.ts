import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSchedulerFormComponent } from './shift-scheduler-form.component';

describe('ShiftSchedulerFormComponent', () => {
  let component: ShiftSchedulerFormComponent;
  let fixture: ComponentFixture<ShiftSchedulerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSchedulerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSchedulerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
