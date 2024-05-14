import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceViewComponent } from './grievance-view.component';

describe('GrievanceViewComponent', () => {
  let component: GrievanceViewComponent;
  let fixture: ComponentFixture<GrievanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievanceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrievanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
