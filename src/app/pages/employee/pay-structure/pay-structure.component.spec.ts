/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PayStructureComponent } from './pay-structure.component';

describe('PayStructureComponent', () => {
  let component: PayStructureComponent;
  let fixture: ComponentFixture<PayStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
