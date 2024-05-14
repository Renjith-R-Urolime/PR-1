import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMasterFormComponent } from './contract-master-form.component';

describe('ContractMasterFormComponent', () => {
  let component: ContractMasterFormComponent;
  let fixture: ComponentFixture<ContractMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
