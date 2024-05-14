import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShiftViewComponent } from './manage-shift-view.component';

describe('ManageShiftViewComponent', () => {
  let component: ManageShiftViewComponent;
  let fixture: ComponentFixture<ManageShiftViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShiftViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShiftViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
