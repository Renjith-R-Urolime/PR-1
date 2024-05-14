import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryFormComponent } from './subsidiary-form.component';

describe('SubsidiaryFormComponent', () => {
  let component: SubsidiaryFormComponent;
  let fixture: ComponentFixture<SubsidiaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsidiaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsidiaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
