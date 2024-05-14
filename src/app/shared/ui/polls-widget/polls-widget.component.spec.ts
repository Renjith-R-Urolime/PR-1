import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsWidgetComponent } from './polls-widget.component';

describe('PollsCardComponent', () => {
  let component: PollsWidgetComponent;
  let fixture: ComponentFixture<PollsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
