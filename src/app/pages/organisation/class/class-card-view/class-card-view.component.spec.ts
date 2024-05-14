import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCardViewComponent } from './class-card-view.component';

describe('ClassCardViewComponent', () => {
  let component: ClassCardViewComponent;
  let fixture: ComponentFixture<ClassCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
