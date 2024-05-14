import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSelectEmpComponent } from './manage-select-emp.component';

describe('ManageSelectEmpComponent', () => {
  let component: ManageSelectEmpComponent;
  let fixture: ComponentFixture<ManageSelectEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSelectEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSelectEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
