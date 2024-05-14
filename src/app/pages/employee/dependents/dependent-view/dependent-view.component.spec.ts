import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentViewComponent } from './dependent-view.component';

describe('DependentViewComponent', () => {
  let component: DependentViewComponent;
  let fixture: ComponentFixture<DependentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
