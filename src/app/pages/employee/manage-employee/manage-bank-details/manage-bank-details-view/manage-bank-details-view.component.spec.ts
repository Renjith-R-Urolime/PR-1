import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankDetailsViewComponent } from './manage-bank-details-view.component';

describe('ManageBankDetailsViewComponent', () => {
  let component: ManageBankDetailsViewComponent;
  let fixture: ComponentFixture<ManageBankDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBankDetailsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBankDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
