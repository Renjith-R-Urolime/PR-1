import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverHourComponent } from './waiver-hour.component';

describe('WaiverHourComponent', () => {
  let component: WaiverHourComponent;
  let fixture: ComponentFixture<WaiverHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiverHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiverHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
