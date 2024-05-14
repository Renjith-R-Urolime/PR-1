import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimePickerComponent } from './new-time-picker.component';

describe('NewTimePickerComponent', () => {
  let component: NewTimePickerComponent;
  let fixture: ComponentFixture<NewTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTimePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
