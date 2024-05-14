import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsWidgetComponent } from './requests-widget.component';

describe('RequestsWidgetComponent', () => {
  let component: RequestsWidgetComponent;
  let fixture: ComponentFixture<RequestsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
