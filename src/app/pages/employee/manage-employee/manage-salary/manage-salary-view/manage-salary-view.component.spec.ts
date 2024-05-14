import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalaryViewComponent } from './manage-salary-view.component';

describe('ManageSalaryViewComponent', () => {
  let component: ManageSalaryViewComponent;
  let fixture: ComponentFixture<ManageSalaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalaryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
