import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubsidiaryViewComponent } from './manage-subsidiary-view.component';

describe('ManageSubsidiaryViewComponent', () => {
  let component: ManageSubsidiaryViewComponent;
  let fixture: ComponentFixture<ManageSubsidiaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubsidiaryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubsidiaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
