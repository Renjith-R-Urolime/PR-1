import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfilePopupComponent } from './employee-profile-popup.component';

describe('EmployeeProfilePopupComponent', () => {
  let component: EmployeeProfilePopupComponent;
  let fixture: ComponentFixture<EmployeeProfilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfilePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
