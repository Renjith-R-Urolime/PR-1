import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassificationComponent } from './manage-classification.component';

describe('ManageClassificationComponent', () => {
  let component: ManageClassificationComponent;
  let fixture: ComponentFixture<ManageClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
