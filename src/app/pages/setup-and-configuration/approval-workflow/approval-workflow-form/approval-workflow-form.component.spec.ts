import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalWorkflowFormComponent } from './approval-workflow-form.component';

describe('ApprovalWorkflowFormComponent', () => {
  let component: ApprovalWorkflowFormComponent;
  let fixture: ComponentFixture<ApprovalWorkflowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalWorkflowFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalWorkflowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
