/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

import { RunPayrollModalComponent } from './run-payroll-modal.component';

describe('RunPayrollModalComponent', () => {
  let component: RunPayrollModalComponent;
  let fixture: ComponentFixture<RunPayrollModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunPayrollModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunPayrollModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
