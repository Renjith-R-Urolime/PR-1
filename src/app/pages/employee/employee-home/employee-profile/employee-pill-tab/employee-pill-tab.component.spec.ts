import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePillTabComponent } from './employee-pill-tab.component';

describe('EmployeePillTabComponent', () => {
  let component: EmployeePillTabComponent;
  let fixture: ComponentFixture<EmployeePillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePillTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
