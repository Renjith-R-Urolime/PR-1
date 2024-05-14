import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalaryFormComponent } from './manage-salary-form.component';

describe('ManageSalaryFormComponent', () => {
  let component: ManageSalaryFormComponent;
  let fixture: ComponentFixture<ManageSalaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
