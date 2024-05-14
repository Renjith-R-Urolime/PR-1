import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankDetailsFormComponent } from './manage-bank-details-form.component';

describe('ManageBankDetailsFormComponent', () => {
  let component: ManageBankDetailsFormComponent;
  let fixture: ComponentFixture<ManageBankDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBankDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBankDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
