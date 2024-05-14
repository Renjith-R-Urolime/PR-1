import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPillTabComponent } from './overview-pill-tab.component';

describe('OverviewPillTabComponent', () => {
  let component: OverviewPillTabComponent;
  let fixture: ComponentFixture<OverviewPillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewPillTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
