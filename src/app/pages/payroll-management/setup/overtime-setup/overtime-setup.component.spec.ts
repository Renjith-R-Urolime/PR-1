import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSetupComponent } from './overtime-setup.component';

describe('OvertimeSetupComponent', () => {
  let component: OvertimeSetupComponent;
  let fixture: ComponentFixture<OvertimeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
