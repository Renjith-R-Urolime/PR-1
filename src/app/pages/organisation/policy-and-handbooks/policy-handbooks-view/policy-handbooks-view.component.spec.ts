import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyHandbooksViewComponent } from './policy-handbooks-view.component';

describe('PolicyHandbooksViewComponent', () => {
  let component: PolicyHandbooksViewComponent;
  let fixture: ComponentFixture<PolicyHandbooksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyHandbooksViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyHandbooksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
