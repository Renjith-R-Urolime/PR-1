import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerBankDetailsFormComponent } from './employer-bank-details-form.component';

describe('EmployerBankDetailsFormComponent', () => {
  let component: EmployerBankDetailsFormComponent;
  let fixture: ComponentFixture<EmployerBankDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerBankDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerBankDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
