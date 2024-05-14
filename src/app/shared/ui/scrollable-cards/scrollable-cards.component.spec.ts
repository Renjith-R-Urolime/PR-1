import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableCardsComponent } from './scrollable-cards.component';

describe('ScrollableCardsComponent', () => {
  let component: ScrollableCardsComponent;
  let fixture: ComponentFixture<ScrollableCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
