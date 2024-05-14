import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardWidgetComponent } from './onboard-widget.component';

describe('OnboardProgresWidgetComponent', () => {
  let component: OnBoardWidgetComponent;
  let fixture: ComponentFixture<OnBoardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
