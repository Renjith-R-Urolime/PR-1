import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMasterViewComponent } from './contract-master-view.component';

describe('ContractMasterViewComponent', () => {
  let component: ContractMasterViewComponent;
  let fixture: ComponentFixture<ContractMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractMasterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
