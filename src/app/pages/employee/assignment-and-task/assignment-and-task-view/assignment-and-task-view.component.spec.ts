import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAndTaskViewComponent } from './assignment-and-task-view.component';

describe('AssignmentAndTaskViewComponent', () => {
  let component: AssignmentAndTaskViewComponent;
  let fixture: ComponentFixture<AssignmentAndTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentAndTaskViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentAndTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
