import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFinderWidgetComponent } from './employee-finder-widget.component';

describe('EmployeeFinderWidgetComponent', () => {
  let component: EmployeeFinderWidgetComponent;
  let fixture: ComponentFixture<EmployeeFinderWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFinderWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeFinderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
