import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSettingsListComponent } from './employee-settings-list.component';

describe('EmployeeSettingsListComponent', () => {
  let component: EmployeeSettingsListComponent;
  let fixture: ComponentFixture<EmployeeSettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSettingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
