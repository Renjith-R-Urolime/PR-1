import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShiftFormComponent } from './manage-shift-form.component';

describe('ManageShiftFormComponent', () => {
  let component: ManageShiftFormComponent;
  let fixture: ComponentFixture<ManageShiftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShiftFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShiftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
