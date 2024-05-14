import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverHourFormComponent } from './waiver-hour-form.component';

describe('WaiverHourFormComponent', () => {
  let component: WaiverHourFormComponent;
  let fixture: ComponentFixture<WaiverHourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiverHourFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiverHourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
