import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassificationViewComponent } from './manage-classification-view.component';

describe('ManageClassificationViewComponent', () => {
  let component: ManageClassificationViewComponent;
  let fixture: ComponentFixture<ManageClassificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClassificationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClassificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
