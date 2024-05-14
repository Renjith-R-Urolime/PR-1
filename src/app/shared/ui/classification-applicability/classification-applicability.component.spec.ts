import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationApplicabilityComponent } from './classification-applicability.component';

describe('ClassificationApplicabilityComponent', () => {
  let component: ClassificationApplicabilityComponent;
  let fixture: ComponentFixture<ClassificationApplicabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationApplicabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationApplicabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
