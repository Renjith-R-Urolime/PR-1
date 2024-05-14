import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankDetailsComponent } from './manage-bank-details.component';

describe('ManageBankDetailsComponent', () => {
  let component: ManageBankDetailsComponent;
  let fixture: ComponentFixture<ManageBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBankDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
