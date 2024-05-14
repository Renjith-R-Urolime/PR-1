import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSetupFormComponentTsComponent } from './overtime-setup-form.component';

describe('OvertimeSetupFormComponentTsComponent', () => {
  let component: OvertimeSetupFormComponentTsComponent;
  let fixture: ComponentFixture<OvertimeSetupFormComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeSetupFormComponentTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeSetupFormComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
