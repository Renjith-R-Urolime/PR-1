import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverHourDetailsComponent } from './waiver-hour-details.component';

describe('WaiverHourDetailsComponent', () => {
  let component: WaiverHourDetailsComponent;
  let fixture: ComponentFixture<WaiverHourDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiverHourDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiverHourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
