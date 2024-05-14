import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCalendarFormComponent } from './work-calendar-form.component';

describe('WorkCalendarFormComponent', () => {
  let component: WorkCalendarFormComponent;
  let fixture: ComponentFixture<WorkCalendarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCalendarFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
