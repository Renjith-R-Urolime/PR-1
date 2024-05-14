import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSkeletonComponent } from './edit-form-skeleton.component';

describe('EditFormSkeletonComponent', () => {
  let component: EditFormSkeletonComponent;
  let fixture: ComponentFixture<EditFormSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
