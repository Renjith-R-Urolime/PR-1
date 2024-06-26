/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

import { ClassViewComponent } from './class-view.component';

describe('ClassViewComponent', () => {
  let component: ClassViewComponent;
  let fixture: ComponentFixture<ClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
