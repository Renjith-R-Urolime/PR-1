import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExitViewComponent } from './employee-exit-view.component';

describe('EmployeeExitViewComponent', () => {
  let component: EmployeeExitViewComponent;
  let fixture: ComponentFixture<EmployeeExitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeExitViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeExitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
