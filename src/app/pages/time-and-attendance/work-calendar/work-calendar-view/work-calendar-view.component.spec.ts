import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCalendarViewComponent } from './work-calendar-view.component';

describe('WorkCalendarViewComponent', () => {
  let component: WorkCalendarViewComponent;
  let fixture: ComponentFixture<WorkCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCalendarViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
