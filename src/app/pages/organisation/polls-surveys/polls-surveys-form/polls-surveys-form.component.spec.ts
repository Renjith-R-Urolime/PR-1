import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsSurveysFormComponent } from './polls-surveys-form.component';

describe('PollsSurveysFormComponent', () => {
  let component: PollsSurveysFormComponent;
  let fixture: ComponentFixture<PollsSurveysFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsSurveysFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollsSurveysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
