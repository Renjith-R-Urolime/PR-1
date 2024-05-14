import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSetupViewComponent } from './overtime-setup-view.component';

describe('OvertimeSetupViewComponent', () => {
  let component: OvertimeSetupViewComponent;
  let fixture: ComponentFixture<OvertimeSetupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeSetupViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeSetupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
