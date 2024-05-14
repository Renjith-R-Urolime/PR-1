import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeViewComponent } from './manage-employee-view.component';

describe('ManageEmployeeViewComponent', () => {
  let component: ManageEmployeeViewComponent;
  let fixture: ComponentFixture<ManageEmployeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
