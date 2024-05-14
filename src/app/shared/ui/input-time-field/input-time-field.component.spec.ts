import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimeFieldComponent } from './input-time-field.component';

describe('InputTimeFieldComponent', () => {
  let component: InputTimeFieldComponent;
  let fixture: ComponentFixture<InputTimeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTimeFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTimeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
