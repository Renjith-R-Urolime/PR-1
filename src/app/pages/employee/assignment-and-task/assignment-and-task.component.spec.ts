import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAndTaskComponent } from './assignment-and-task.component';

describe('AssignmentAndTaskComponent', () => {
  let component: AssignmentAndTaskComponent;
  let fixture: ComponentFixture<AssignmentAndTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentAndTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentAndTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
