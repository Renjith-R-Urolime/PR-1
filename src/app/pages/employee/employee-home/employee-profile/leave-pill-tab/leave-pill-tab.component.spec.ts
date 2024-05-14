import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePillTabComponent } from './leave-pill-tab.component';

describe('LeavePillTabComponent', () => {
  let component: LeavePillTabComponent;
  let fixture: ComponentFixture<LeavePillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavePillTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
