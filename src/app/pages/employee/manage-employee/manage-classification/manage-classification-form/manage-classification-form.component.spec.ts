import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassificationFormComponent } from './manage-classification-form.component';

describe('ManageClassificationFormComponent', () => {
  let component: ManageClassificationFormComponent;
  let fixture: ComponentFixture<ManageClassificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClassificationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClassificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
