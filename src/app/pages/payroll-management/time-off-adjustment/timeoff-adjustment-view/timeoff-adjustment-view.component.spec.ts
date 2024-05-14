/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

import { TimeoffAdjustmentViewComponent } from './timeoff-adjustment-view.component';

describe('TimeoffAdjustmentViewComponent', () => {
  let component: TimeoffAdjustmentViewComponent;
  let fixture: ComponentFixture<TimeoffAdjustmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeoffAdjustmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoffAdjustmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
