import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesDropdownComponent } from './notices-dropdown.component';

describe('NoticesDropdownComponent', () => {
  let component: NoticesDropdownComponent;
  let fixture: ComponentFixture<NoticesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticesDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
