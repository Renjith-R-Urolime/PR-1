import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsSurveysViewComponent } from './polls-surveys-view.component';

describe('PollsSurveysViewComponent', () => {
  let component: PollsSurveysViewComponent;
  let fixture: ComponentFixture<PollsSurveysViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsSurveysViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollsSurveysViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
