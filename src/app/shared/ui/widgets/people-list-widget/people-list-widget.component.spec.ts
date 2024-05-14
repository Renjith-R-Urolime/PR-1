import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListWidgetComponent } from './people-list-widget.component';

describe('PeopleListWidgetComponent', () => {
  let component: PeopleListWidgetComponent;
  let fixture: ComponentFixture<PeopleListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleListWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
