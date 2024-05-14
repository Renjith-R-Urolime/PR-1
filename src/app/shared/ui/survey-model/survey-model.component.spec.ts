import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyModelComponent } from './survey-model.component';

describe('SurveyModelComponent', () => {
  let component: SurveyModelComponent;
  let fixture: ComponentFixture<SurveyModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
