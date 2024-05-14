import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyHandbooksFormComponent } from './policy-handbooks-form.component';

describe('PolicyHandbooksFormComponent', () => {
  let component: PolicyHandbooksFormComponent;
  let fixture: ComponentFixture<PolicyHandbooksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyHandbooksFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyHandbooksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
