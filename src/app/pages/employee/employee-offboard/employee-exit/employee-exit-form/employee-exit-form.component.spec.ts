import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExitFormComponent } from './employee-exit-form.component';

describe('EmployeeExitFormComponent', () => {
  let component: EmployeeExitFormComponent;
  let fixture: ComponentFixture<EmployeeExitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeExitFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeExitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
